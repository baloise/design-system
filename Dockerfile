FROM node:alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update
ARG NODE_OPTIONS=--openssl-legacy-provider

# Set working directory
WORKDIR /app
RUN npm install turbo --global

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
COPY packages/components/package.json ./packages/components/package.json
COPY packages/components-angular/package.json ./packages/components-angular/package.json
COPY packages/components-react/package.json ./packages/components-react/package.json
COPY packages/components-vue/package.json ./packages/components-vue/package.json
COPY packages/components-table/package.json ./packages/components-table/package.json
COPY packages/css/package.json ./packages/css/package.json
COPY packages/favicons/package.json ./packages/favicons/package.json
COPY packages/icons/package.json ./packages/icons/package.json
COPY packages/tokens/package.json ./packages/tokens/package.json
COPY packages/maps/package.json ./packages/tokens/package.json
COPY packages/testing/package.json ./packages/tokens/package.json
COPY packages/output-targets/angular/package.json ./packages/output-targets/angular/package.json
COPY packages/output-targets/react/package.json ./packages/output-targets/react/package.json
COPY packages/output-targets/vue/package.json ./packages/output-targets/vue/package.json

# Install dependecies
RUN CYPRESS_INSTALL_BINARY=0 npm install

# Copy app source
COPY . .

RUN npm run storybook

FROM bitnami/nginx:latest

COPY --from=builder /app/storybook /app
