FROM node:14

COPY . /app
WORKDIR /app

RUN npm i

ENTRYPOINT node src/index.js
