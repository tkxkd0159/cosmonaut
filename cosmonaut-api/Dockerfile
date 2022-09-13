FROM node AS builder
WORKDIR /workspace
COPY src ./src
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.prod.json .env ./
RUN npm run build

FROM node
ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}
WORKDIR /workspace
RUN apt-get update && apt-get install docker.io -y
RUN npm install pm2 -g
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /workspace/dist/src ./dist/src
COPY cargo-projects ./cargo-projects
COPY pm2-env.json Makefile tsconfig.prod.json ./
COPY assets ./assets
CMD pm2-runtime start pm2-env.json --name cosmonaut-api --env ${BUILD_ENV}