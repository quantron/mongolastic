FROM node:12-alpine

LABEL maintainer="QuantronSystems"

WORKDIR /usr/src/app/

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./config.json ./config.json
COPY ./tsconfig.base.json ./tsconfig.base.json
COPY ./tsconfig.prod.json ./tsconfig.prod.json

RUN npm clean-install
RUN npm run build
RUN rm -r ./src
RUN npm prune --production
RUN npm link

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

ENTRYPOINT [ "/usr/local/bin/quant-connect" ]
