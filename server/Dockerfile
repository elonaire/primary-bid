# Build server app
FROM node:12 AS builder_server
RUN yarn global add @nestjs/cli
WORKDIR /app/server
COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build

# Second Stage : Setup command to run server app using lightweight node image
FROM node:12-alpine
WORKDIR /app/server
COPY --from=builder_server /app/server ./
EXPOSE 3000
CMD ["yarn", "start:prod"]