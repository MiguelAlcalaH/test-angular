@Library('VDHLib') 

// Import shared library classes
import es.securitasdirect.vdh.BuildNode
import es.securitasdirect.vdh.PodDefinition
import es.securitasdirect.vdh.InternalConfig
import es.securitasdirect.vdh.Notifications
import es.securitasdirect.vdh.SCAWrapper

// Import helm library classes
import es.securitasdirect.vdh.helm.service.HelmServiceFactory
import es.securitasdirect.vdh.helm.service.HelmServiceType
import es.securitasdirect.vdh.helm.service.conf.ContinuosDeploymentConf
import es.securitasdirect.vdh.helm.service.conf.ContinuosDeploymentBranchConf
import es.securitasdirect.vdh.helm.service.conf.HelmServiceConf
import es.securitasdirect.vdh.helm.deploy.HelmDeployType

/**
 * Config parameteres of the job
 */
def k8sCluster = "ed1kisd" // Kubernetes cluster for continuous deployment purposes.
def appName= 'mig-angular'

// Instantiation shared library objects
def buildNode = new BuildNode(this, env.DOCKER_REGISTRY)
def internalConfig = new InternalConfig(env.DOCKER_REGISTRY)
def podDefinition = new PodDefinition(env.DOCKER_REGISTRY, this)
Notifications notify = new Notifications(this)
SCAWrapper sca = new SCAWrapper(this)

pipeline {
  agent {
    kubernetes {
      yaml podDefinition.getPodNodeMicroservices("16.14.2-alpine")
    }
  }
  options {
    skipStagesAfterUnstable()
    buildDiscarder(logRotator(numToKeepStr: '5'))
    // Enable notification through Microsoft Teams here. https://confluence.apps.verisure.com/pages/viewpage.action?pageId=81403813
  }
  // Post actions: Email notification
  // Enable mail notification here. https://confluence.apps.verisure.com/pages/viewpage.action?pageId=81048195
  /*post {
    always {
      script {
          def result = currentBuild.result
          def mailusers= "example.mail.1@securitasdirect.es,example.mail.2@securitasdirect.es"
          notify.sendToEmail(reponame, currentBranch, result, mailusers)
      }
    }
  }*/

  stages {
    stage('Build') {
      steps {
        container('node') {
          script {
            buildNode.prepareBuild()
            sh "npm ci"
            sh "npm run build"
            sh "npm test"
          }
        }
      }
    }
    stage('SCA analysis') {

      steps {
        script {
          container('jnlp') {
            sca.analyze()
          }
        }
      }
    }
    stage('SonarQube Analysis') {
      steps {
        script {
          buildNode.analyze()
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          //Call this function to get SCA image analysis
          buildNode.setAnalyzeDockerImage()
          buildNode.buildAndPushDockerImage(appName)
        }
      }
    }

    stage('Deploy Charts') {      
      steps {        
        script {
            HelmServiceConf serviceConf = new HelmServiceConf(
              continuosDeploymentConf: new ContinuosDeploymentConf(
                                              deployType: HelmDeployType.DEPLOY_SIMPLE_CHART,
                                              develop: new ContinuosDeploymentBranchConf(
                                                cluster: k8sCluster
                                              ),
                                              version: buildNode.getVersionFromJson("package.json")
                                        ),
              parent: this,
              branch: env.BRANCH_NAME
            )
            HelmServiceFactory.build(HelmServiceType.CONTINUOS_DEPLOYMENT_SERVICE, serviceConf).run()
        }      
      }    
    }
  }
}
