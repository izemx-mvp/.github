FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Lovable and hand-written apps often have a lockfile that drifts from package.json.
RUN if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps || (echo "package-lock out of sync — falling back to npm install" && npm install --legacy-peer-deps); \
    else \
      echo "No package-lock.json found, using npm install" && npm install --legacy-peer-deps; \
    fi

COPY . .
RUN npm run build:docker

FROM nginx:alpine AS runtime

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
