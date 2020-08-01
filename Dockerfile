# Using Node:10 Image Since it contains all 
# the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
# First Stage : to install and build dependences

# Build client app
FROM node:12 AS builder
RUN yarn global add @vue/cli
WORKDIR /app/client
COPY ./client/package.json ./
RUN yarn
COPY ./client .
RUN yarn build

# Build server app
FROM node:12 AS builder_server
RUN yarn global add @nestjs/cli
WORKDIR /app/server
COPY ./server/package.json ./
RUN yarn
COPY ./server .
RUN yarn build


# Second Stage : Setup command to run client app using lightweight node image
# FROM node:10-alpine
# WORKDIR /app/client
# RUN npm i -g serve
# COPY --from=builder /app/client ./
# EXPOSE 3006
# CMD ["serve", "-s", "dist"]

FROM nginx as production-stage
RUN mkdir /app
COPY --from=builder /app/client/dist /app
COPY ./client/nginx.conf /etc/nginx/nginx.conf

# Second Stage : Setup command to run server app using lightweight node image
FROM node:12-alpine
WORKDIR /app/server
COPY --from=builder_server /app/server ./
EXPOSE 3000
CMD ["yarn", "start:prod"]