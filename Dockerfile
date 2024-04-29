FROM node:22.0.0-alpine as npm-build

WORKDIR /app

ADD package*.json .

RUN npm ci

###

FROM node:22.0.0-alpine as build

COPY --from=npm-build /app /app

WORKDIR /app

ADD nest-cli.json tsconfig*.json .
ADD src src/

RUN npm run build

###

FROM node:22.0.0-alpine as npm

WORKDIR /app

ADD package*.json .

RUN npm ci --omit=dev

###

FROM node:22.0.0-alpine

WORKDIR /app

COPY --from=build /app .
COPY --from=npm /app .

ENV NODE_PATH=/app/dist
ENV NODE_ENV=production

ENTRYPOINT ["node", "dist/main.js"]
