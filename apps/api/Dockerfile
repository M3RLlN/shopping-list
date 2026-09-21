FROM node:24.19.0-alpine3.24 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY packages/domain/package.json packages/domain/
COPY packages/infrastructure/package.json packages/infrastructure/
COPY packages/contracts/package.json packages/contracts/
COPY apps/frontend/package.json apps/frontend/

RUN npm ci

COPY apps/api apps/api/
COPY packages/domain packages/domain/
COPY packages/infrastructure packages/infrastructure/
COPY packages/contracts packages/contracts

RUN npm run build



FROM node:24.19.0-alpine3.24
ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY packages/domain/package.json packages/domain/
COPY packages/infrastructure/package.json packages/infrastructure/
COPY packages/contracts/package.json packages/contracts/
COPY apps/frontend/package.json apps/frontend/

RUN npm ci --omit=dev

COPY --from=builder --chown=node:node /app/apps/api/dist apps/api/dist
COPY --from=builder --chown=node:node /app/packages/domain/dist packages/domain/dist
COPY --from=builder --chown=node:node /app/packages/infrastructure/dist packages/infrastructure/dist
COPY --from=builder --chown=node:node /app/packages/contracts/dist packages/contracts/dist

EXPOSE 3000

USER node

WORKDIR /app/apps/api

CMD ["node", "dist/server.js"]