FROM node:16
WORKDIR /usr/src/app/backend

COPY . .

RUN npm ci

CMD npm run dev