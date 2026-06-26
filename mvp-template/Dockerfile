FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
# --legacy-peer-deps tolerates Lovable's frequent peer-dependency mismatches
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else echo "No package-lock.json found, falling back to npm install" && npm install --legacy-peer-deps; fi

COPY . .
RUN npm run build:docker

FROM node:22-alpine AS runtime

WORKDIR /app

# Copy the full Nitro output: server bundle + static assets
COPY --from=builder /app/dist ./dist

EXPOSE 80

ENV PORT=80
ENV NODE_ENV=production

CMD ["node", "dist/server/server.js"]
