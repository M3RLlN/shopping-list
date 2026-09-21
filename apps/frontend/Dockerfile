FROM node:24.19.0-alpine3.24 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY packages/domain/package.json packages/domain/
COPY packages/infrastructure/package.json packages/infrastructure/
COPY packages/contracts/package.json packages/contracts/
COPY apps/frontend/package.json apps/frontend/

RUN npm ci

COPY apps/frontend apps/frontend
COPY packages/domain packages/domain
COPY packages/contracts packages/contracts

RUN npm run build -w @shopping/domain
RUN npm run build -w @shopping/contracts
RUN npm run build -w @shopping/frontend



FROM nginx:1.31.4-alpine3.24

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80