# izemx-mvp central CI

- `.github/workflows/mvp-deploy.yml` — reusable deploy pipeline
- `mvp-template/` — Dockerfiles, nginx, k8s manifests

## Build modes (auto-detected)

| Detection | Mode | Runtime |
|---|---|---|
| `index.html` at repo root | static HTML | nginx |
| `package.json` without `src/routes/api/` | Lovable SPA | nginx |
| `package.json` + `src/routes/api/*.ts(x)` | fullstack | Node (TanStack Start + Nitro) |

MVPs **without** a database are unchanged — only repos with API routes use the Node runtime.

## MVP repos

Each app only needs `.github/workflows/deploy.yml` calling the reusable workflow with `secrets: inherit`.

## Required GitHub org settings

**Secrets:** `DOCKERHUB_USERNAME`, `DOCKER_PASSWORD`, `KUBECONFIG`, `HOSTINGER_API_TOKEN`, `DISCORD_WEBHOOK_URL` (optional)

**Variables:** `DOCKER_NAMESPACE=marketingconfort`, `MVP_SERVER_IP=187.124.12.100`, `DOMAIN=izemxlab.com`, `CLUSTER_ISSUER=letsencrypt-prod`

**This repo → Settings → Actions → General → Access:**  
Choose **Accessible from repositories in the izemx-mvp organization** and save.

## Optional per-repo secrets (DB-backed fullstack MVPs only)

Add these **only on repos that need a database or email connector** (e.g. `formation`). Other MVPs can omit them entirely.

| Secret | Used for |
|---|---|
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (e.g. `5432`) |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `LOVABLE_API_KEY` | Optional — Resend connector via Lovable |
| `RESEND_API_KEY` | Optional — Resend email API |

The pipeline creates a Kubernetes secret `{repo-name}-env` in `mvp-lab` and mounts it via `envFrom` (optional — pods start even when the secret is missing).

**Network:** ensure PostgreSQL is reachable from the cluster node (`187.124.12.100`). If the DB is on an internal hostname (e.g. `dbs-local.mc-intern.com`), open firewall/DNS so cluster pods can connect on port 5432.
