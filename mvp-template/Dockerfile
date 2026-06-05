FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
# --legacy-peer-deps tolerates Lovable's frequent peer-dependency mismatches
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else echo "No package-lock.json found, falling back to npm install" && npm install --legacy-peer-deps; fi

COPY . .
RUN npm run build:docker

FROM nginx:alpine AS runtime

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
