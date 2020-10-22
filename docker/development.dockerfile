FROM node:12-alpine

LABEL maintainer="QuantronSystems"

WORKDIR /usr/src/app/

COPY . .

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait
