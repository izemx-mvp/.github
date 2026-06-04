# izemx-mvp central CI

- `.github/workflows/mvp-deploy.yml` — reusable deploy pipeline
- `mvp-template/` — Dockerfile, nginx, k8s manifests

## MVP repos

Each app only needs `.github/workflows/deploy.yml` calling the reusable workflow, **or** a standalone copy like `agent-hub` uses.

## Required GitHub org settings

**Secrets:** `DOCKER_AUTH_CONFIG`, `KUBECONFIG`, `HOSTINGER_API_TOKEN`, `DISCORD_WEBHOOK_URL` (optional)

**Variables:** `DOCKER_NAMESPACE=marketingconfort`, `MVP_SERVER_IP=187.124.12.100`, `DOMAIN=izemxlab.com`, `CLUSTER_ISSUER=letsencrypt-prod`

**This repo → Settings → Actions → General → Access:**  
Choose **Accessible from repositories in the izemx-mvp organization** and save.
