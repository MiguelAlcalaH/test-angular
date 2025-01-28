# Changelog
All notable changes to this project will be documented in this file.

## [3.3.0] - 2024-11-04
### Added
- [PS2CPP-878] (https://jira.apps.verisure.com/browse/PS2CPP-1265)
- [PS2CPP-1274] (https://jira.apps.verisure.com/browse/PS2CPP-1274)
 - feat: Extend configuration for k8s service from helm chart
 - feat: Enable priorityClasses in statefulset and daemonset templates

## [3.2.0] - 2024-08-27
### Added
- [PS2CPP-926] (https://jira.apps.verisure.com/browse/PS2CPP-926)
 - feat: new release 3.2.0 to make cronjob compatible with microservice scaffolding to decoupled solution

## [3.0.0] - 2024-06-26
### Added
- [PS2CPP-519] (https://jira.apps.verisure.com/browse/PS2CPP-519)
 - feat: include new BigIP VIPs for epi2kiitops & epi1kiitops 
 - Integrate decouple release to have only one helm-utils-lib version

## [2.5.0] - 2024-04-12
### Added
- [PS2CPP-396] (https://jira.apps.verisure.com/browse/PS2CPP-396)
 - Include pdb template in kubernetes helm generator

## [2.4.2] - 2023-10-10
### Added
- [IAC-439](https://jira.apps.verisure.com/browse/IAC-439)
 - Include gracefullshutdown in java microservice archetype

## [2.4.1] - 2023-09-19
### Added
- [IAC-564](https://jira.apps.verisure.com/browse/IAC-564)
 - Added capability to istio to perform host filtering

## [2.4.0] - 2023-08-30
### Added
- [PS2PD-11164](https://jira.apps.verisure.com/browse/PS2PD-11164)
  - feat: include new tpl functions in _names.tpl to support a list of PV/PVCs from helm values.

## [2.3.8] - 2023-05-17
### Fixed
- [IAC-402](https://jira.apps.verisure.com/browse/IAC-402)
  - feat: include new tpl function in apiVersions.tpl to upgrade HPA apiVersion to autoscaling/v2 since K8S v1.25
    https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25 

## [2.3.7] - 2023-05-17
### Fixed
- [IAC-408](https://jira.apps.verisure.com/browse/IAC-408)
  - Add missing value on bigip template
  - Remove space on statefulset.yaml
## [2.3.6] - 2023-04-24
### Fixed
- [IAC-306](https://jira.apps.verisure.com/browse/IAC-306)
  - Fix configure the life test in f5 for the different use cases.
## [2.3.5] - 2023-03-16
### Fixed
- [PS2PI-5901](https://jira.apps.verisure.com/browse/PS2PI-5901)
  - Fix common.errors.noCloudProvidernoF5noIstiogatewaynoIstio validation. 
  - TODO: fix validation to exclude ES environments because F5 is manually 
    created by Comms and not provisioned with K8S F5 Controller

## [2.3.4] - 2023-02-22
### Fixed
- [PS2PI-5901](https://jira.apps.verisure.com/browse/PS2PI-5901)
  - Comment common.errors.noCloudProvidernoF5noIstiogatewaynoIstio validation. 
  - TODO: fix validation to exclude PRO environments.

## [2.3.3] - 2023-02-01
### Changed
- [PS2PI-7519](https://jira.apps.verisure.com/browse/PS2PD-7519)
    - Updated function to get apiVersion
## [2.3.3] - 2022-02-22
## Changed
- [IAC-155](https://jira.apps.verisure.com/browse/IAC-155)
    - Extend deployment & statefulset labels to set common.labels.extendedlabels for MutatingWebhook in new AKS infrastructure.


## [2.3.2] - 2022-02-01
 - No new changes applied to helm-utils-lib in release 2.3.2.

## [2.3.1] - 2023-01-30
### Fixed
- [PS2PI-5890](https://jira.apps.verisure.com/browse/PS2PI-5890)
  - Only check for istio avalability in the cluster when user enable istio value.
  
## [2.3.0] - 2022-12-16
### Changed
- [IAC-82](https://jira.apps.verisure.com/browse/IAC-82) Change templates to:
    - Enable use of Istio in OnPremise cluster.
    - Integrate F5 BigIP with istio Ingress Gateway to expose microservices out of nesh in OnPremise.
    - Decouple deployment strategy and use of istio.

## [2.2.5] - 2022-10-18
### Fixed
Fixed bug in F5 integration when TCP mode is selected

### Added
Added F5 timeout parameter to TCP mode in F5 integration

## [2.2.4] - 2022-09-06
### Added
Added automatic F5 integration for ed1kisd