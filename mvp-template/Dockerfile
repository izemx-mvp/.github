FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Lovable often ships no lockfile, so npm grabs the newest transitive versions.
# Those tarballs are sometimes 404 for a few minutes after publish (h3, tanstack, ...).
RUN set -e; \
    install() { \
      if [ -f package-lock.json ]; then \
        npm ci --legacy-peer-deps && return 0; \
        echo "package-lock out of sync — falling back to npm install"; \
      else \
        echo "No package-lock.json found, using npm install"; \
      fi; \
      i=1; \
      while [ "$i" -le 5 ]; do \
        npm install --legacy-peer-deps && return 0; \
        echo "npm install failed (attempt $i/5), retrying in 20s..."; \
        i=$((i+1)); \
        sleep 20; \
      done; \
      return 1; \
    }; \
    install

COPY . .
RUN npm run build:docker

FROM nginx:alpine AS runtime

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
