## Introduction

mig-angular microservice chart for Verisure Securitas Direct deploy on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.12+
- Helm 3.0-beta3+

More Information:
- [How to deploy with helm](https://confluence.apps.verisure.com/display/PSS/How+to+deploy+with+Helm+in+Securitas+Direct)
- [Helm utils library](https://bitbucket.dev.verisure.com/projects/KAR/repos/helm-utils-lib/browse)

## Parameters 

The following table lists the configurable parameters of the chart and their default values.

### Common parameters (values.yaml)

| Parameter                            | Description                                                                               | Default                        |
|--------------------------------------|-------------------------------------------------------------------------------------------|--------------------------------|
| `appServiceAccount`                  | String to fully override consul.fullname                                                  | `nil`                          |
| `componentType`                      | Component metadata used mainly for labels                                                 | `nil`                          |
| `componentManagedBy`                 | Component metadata used mainly for labels                                                 | `nil`                          |
| `container.livenessProbe`            | Liveness probe configuration                                                              | Check `values.yaml` file       |
| `container.readinessProbe`           | Readiness probe configuration                                                             | Check `values.yaml` file       |

### Target Cluster parameters (values-targetCluster.yaml)

| Parameter                            | Description                                                                               | Default                                                       |
|--------------------------------------|-------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| `appNamespace`                       | String to partially override consul.fullname                                              | `nil`                                                         |
| `targetCluster`                      | Cluster name                                                                              | `nil`                                                         |
| `terminationGracePeriodSeconds`      | terminationGracePeriodSeconds                                                             | `30`                                                          |
| `container.imageName`                | Image Name                                                                                | `nil`                                                         |
| `container.imageVersion`             | Image Version                                                                             | `nil`                                                         |
| `container.imagePullPolicy`          | Image pull policy                                                                         | `Always`                                                      |
| `container.resources.limits`         | The resources limits for containers                                                       | `{}`                                                          |
| `container.resources.requests`       | The requested resources for containers                                                    | `{}`                                                          |
| `container.extraVolumeMounts`        | Optionally specify extra list of additional volumeMounts for container                    | `[]`                                                          |
| `extraVolumes`                       | Optionally specify extra list of additional volumes for container                         | `[]`                                                          |
| `fsGroup`                            | Pods Security Context fsGroup user                                                        | `8888`                                                        |
| `podAnnotations`                     | Additional pod annotations                                                                | `{}`                                                          |
| `podLabels`                          | Additional pod labels                                                                     | `{}`                                                          |
| `extraEnvVars`                       | Extra environment variables to be set on container                                        | `{}`                                                          |
| `configmap`                          | Configuration to be injected as ConfigMap                                                 | `enabled: false` Check `values-targetCluster.yaml` file.      |
| `ConfigmapAdvancedConfiguration`     | Configuration to add ConfigMap data to a Volume (ConfigMap SubPaths to Mount Files)       | `enabled: false` Check `values-targetCluster.yaml` file       |
| `secret`                             | Configuration to be injected as Secret                                                    | `enabled: false` Check `values-targetCluster.yaml` file.      |
| `SecretAdvancedConfiguration`        | Configuration to add Secret data to a Volume (Secret SubPaths to Mount Files)             | `enabled: false` Check `values-targetCluster.yaml` file       |
| `podAffinityPreset`                  | Pod affinity preset. Ignored if `affinity` is set. Allowed values: `soft` or `hard`       | `""`                                                          |
| `podAntiAffinityPreset`              | Pod anti-affinity preset. Ignored if `affinity` is set. Allowed values: `soft` or `hard`  | `soft`                                                        |
| `nodeAffinityPreset.type`            | Node affinity preset type. Ignored if `affinity` is set. Allowed values: `soft` or `hard` | `""`                                                          |
| `nodeAffinityPreset.key`             | Node label key to match Ignored if `affinity` is set.                                     | `""`                                                          |
| `nodeAffinityPreset.values`          | Node label values to match. Ignored if `affinity` is set.                                 | `[]`                                                          |
| `nodeSelector`                       | Node labels for pod assignment.                                                           | `{}`                                                          |
| `replicaCount`                       | Number of replicas                                                                        | `1`                                                           |
| `service.type`                       | Kubernetes Service Type                                                                   | `NodePort`                                                    |
| `service.nodePort`                   | Kubernetes node port                                                                      | `""`                                                          |
| `service.port`                       | Service port                                                                              | `8080`                                                        |
| `service.targetPort`                 | Service targetPort                                                                        | `8080`                                                        |
| `serviceAnnotations`                 | Annotations for service                                                                   | `{}` (evaluated as a template)                                |
| `f5`                                 | F5 balanced service configuration                                                         | `enabled: false` Check `values-targetCluster.yaml` file       |
| `hpa`                                | Horizontal Pod Autoscaler configuraton                                                    | `enabled: false` Check `values-targetCluster.yaml` file       |
| `persistentVolumes`                  | Persistent Volumes configuraton                                                           | `enabled: false` Check `values-targetCluster.yaml` file       |
| `istio.enabled`                      | Enable istio to deploy                                                                    | `Boolean (True/False) to enable/disable istio`                |
| `istio.gateway`                      | Enable istio gateway to expose outside the cluster using istio-ingress-gateway provided by PS2 Core IAC  | `Boolean (True/False) to enable/disable istio gateway`     |
| `deploymentStrategy`                 | Deployment Strategy Configuration                                                         | `enabled: false` Check `values-targetCluster.yaml` file       |
| `pdb.enabled`                        | Enable Pod Disruption Budget for target                                                   | `enabled: false` Check `values-targetCluster.yaml` file       |
| `pdb.type`                           | Set pdb type. Allowed values: `minAvailable`or `maxUnavailable`                           | `""`                                                          | 
| `pdb.value`                          | Value can be an absolute number or a percentage of desired Pods (K8S always round UP)     | `1`                                                           |