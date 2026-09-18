# izemx-mvp central CI

- `.github/workflows/mvp-deploy.yml` — reusable deploy pipeline
- `mvp-template/` — Dockerfiles, nginx, k8s manifests

## Build modes (auto-detected)

| Detection | Mode | Runtime |
|---|---|---|
| Root `Dockerfile` + `client/` + `server/` | **custom** | Keep repo Dockerfile (e.g. Express **8787**) |
| `index.html` at repo root | static HTML | nginx |
| `package.json` without server features | Lovable SPA | nginx |
| `src/routes/api/` | fullstack | Node (TanStack Start + Nitro) |

Lovable / static MVPs are unchanged. Custom mode never overwrites the app's Dockerfile.

## MVP repos

Each app only needs `.github/workflows/deploy.yml` calling the reusable workflow with `secrets: inherit`.

## Required GitHub org settings

**Secrets:** `DOCKERHUB_USERNAME`, `DOCKER_PASSWORD`, `KUBECONFIG`, `HOSTINGER_API_TOKEN`, `DISCORD_WEBHOOK_URL` (optional)

**Variables:** `DOCKER_NAMESPACE=marketingconfort`, `MVP_SERVER_IP=187.124.12.100`, `DOMAIN=izemxlab.com`, `CLUSTER_ISSUER=letsencrypt-prod`

**This repo → Settings → Actions → General → Access:**  
Choose **Accessible from repositories in the izemx-mvp organization** and save.

## Optional per-repo secrets

| Secret | Used for |
|---|---|
| `DB_*` | PostgreSQL (fullstack apps like formation) |
| `LOVABLE_API_KEY` / `RESEND_API_KEY` | Email connector |
| `OPENAI_API_KEY` | Custom apps (e.g. decorum) — optional; demo mode without it |
| `OPENAI_VISION_MODEL` / `OPENAI_IMAGE_MODEL` / `OPENAI_TEXT_MODEL` | Optional model overrides |

The pipeline creates `{repo-name}-env` in `mvp-lab` and mounts it via `envFrom` (optional).

## Decorum example

1. Repo on GitHub: `izemx-mvp/decorum-mvp` (public), with `.github/workflows/deploy.yml`
2. Optional repo secrets: `OPENAI_API_KEY` (+ model secrets if needed)
3. Deploy → `https://decorum-mvp.izemxlab.com` (slug = repo name)
