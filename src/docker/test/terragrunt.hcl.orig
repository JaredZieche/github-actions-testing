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

  public_identity_provider_issuer_url = "https://casemgmt.dev.mbms.va.gov/alt-dex"
  public_identity_provider_enabled = get_env("PUBLIC_IDENTITY_PROVIDER_ENABLED", get_env("STATE_PREFIX") == "" ? true: false)

  tool_config = [
    {
      name = "appdynamics"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "bms"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "certManager"
      revision = "1.5.0"
      enabled = "true"
    },
    {
      name = "clusterAutoscaler"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "consul"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "dex"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "efsstorageclass"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "gangway"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "ingress"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "jenkins"
      enabled = "false"
    },
    {
      name = "k8sdashboard"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "k8sRbac"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "karpenter"
      enabled = "false"
      revision = "1.5.0"
    },
    {
      name = "kong"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "konga"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "kubecost"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "metricsserver"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "nexus"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "oauth2proxy"
      enabled = "true"
      revision = "1.5.0"
   },
    {
      name = "pinniped"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "prometheus"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "sonarqube"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "twistlock"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "vault"
      enabled = "true"
      revision = "1.5.0"
    },
    {
      name = "velero"
      enabled = "true"
      revision = "1.5.0"
    },
  ]
}

