FROM node:16@sha256:c33a8221330d87a2113fb6cdbb8fbb243592c62f89de923e9ef5bb8b627c2b9d

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app/

RUN npm ci --only-production

USER node

CMD npm start
