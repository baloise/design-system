FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN CYPRESS_INSTALL_BINARY=0 npm ci --unsafe-perm
RUN npm run docs

FROM bitnami/nginx:latest

COPY --from=builder /app/storybook /app
