FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY packages/domain/package.json packages/domain/
COPY packages/infrastructure/package.json packages/infrastructure/
COPY apps/frontend/package.json apps/frontend/

RUN npm ci

COPY apps/api apps/api/
COPY packages/domain packages/domain/
COPY packages/infrastructure packages/infrastructure/

RUN npm run build



FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY packages/domain/package.json packages/domain/
COPY packages/infrastructure/package.json packages/infrastructure/
COPY apps/frontend/package.json apps/frontend/

RUN npm ci --omit=dev

COPY --from=builder /app/apps/api/dist apps/api/dist
COPY --from=builder /app/packages/domain/dist packages/domain/dist
COPY --from=builder /app/packages/infrastructure/dist packages/infrastructure/dist

EXPOSE 3000

USER node

WORKDIR /app/apps/api

CMD ["node", "dist/server.js"]