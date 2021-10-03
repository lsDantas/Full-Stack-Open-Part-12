FROM node:16@sha256:c33a8221330d87a2113fb6cdbb8fbb243592c62f89de923e9ef5bb8b627c2b9d

WORKDIR /usr/src/app/

COPY . .

RUN npm install

CMD npm run dev