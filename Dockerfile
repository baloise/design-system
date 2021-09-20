FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN CYPRESS_INSTALL_BINARY=0 npm install
RUN npm run docs:publish

FROM bitnami/nginx:latest

COPY --from=builder /app/docs/public /app
