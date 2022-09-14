include "root" {
  path   = find_in_parent_folders()
  expose = true
}

dependencies {
  paths = [
    "../../eks-cluster"
  ]
}

terraform {
  source = "git::https://github.com/department-of-veterans-affairs/bip-terraform-modules.git//modules/eks-cluster-tooling-bootstrap?ref=master"
}

inputs = {

  sealed_secrets_chart_values_overrides = {
    "commandArgs": "{--key-renew-period=0}"
  }

  additional_chart_value_files = [
    "${file("../../../../../argocd-bootstrap-values-defaults.yaml")}", "${file("argocd-bootstrap-values.yaml")}"
  ]

  enable_unique_domain_as_primary = get_env("ENABLE_UNIQUE_DOMAIN_AS_PRIMARY", get_env("STATE_PREFIX") == "" ? false: true)
  machine_agent_override_enabled = get_env("MACHINE_AGENT_OVERRIDE_ENABLED", false)
  velero_restore_override_enabled = get_env("VELERO_RESTORE_OVERRIDE_ENABLED", false)
  velero_schedule_override_enabled = get_env("VELERO_SCHEDULE_OVERRIDE_ENABLED", false)

  public_identity_provider_issuer_url = "https://casemgmt.dev.mbms.va.gov/dex"
  public_identity_provider_enabled = get_env("PUBLIC_IDENTITY_PROVIDER_ENABLED", get_env("STATE_PREFIX") == "" ? true: false)

  tool_config = [
    {
      name = "appdynamics"
      enabled = "true"
    },
    {
      name = "certManager"
      enabled = "true"
    },
    {
      name = "clusterAutoscaler"
      enabled = "true"
    },
    {
      name = "consul"
      enabled = "true"
    },
    {
      name = "dex"
      enabled = "true"
    },
    {
      name = "efsstorageclass"
      enabled = "true"
    },
    {
      name = "gangway"
      enabled = "true"
    },
    {
      name = "ingress"
      enabled = "true"
    },
    {
      name = "jenkins"
      enabled = "false"
    },
    {
      name = "k8sdashboard"
      enabled = "true"
    },
    {
      name = "k8sRbac"
      enabled = "true"
    },
    {
      name = "karpenter"
      enabled = "false"
    },
    {
      name = "kubecost"
      enabled = "true"
    },
    {
      name = "metricsserver"
      enabled = "true"
    },
    {
      name = "nexus"
      enabled = "true"
    },
    {
      name = "oauth2proxy"
      enabled = "true"
    },
    {
      name = "pinniped"
      enabled = "true"
    },
    {
      name = "prometheus"
      enabled = "true"
    },
    {
      name = "sonarqube"
      enabled = "true"
    },
    {
      name = "twistlock"
      enabled = "true"
    },
    {
      name = "vault"
      enabled = "true"
    },
    {
      name = "velero"
      enabled = "true"
    },
  ]
}

