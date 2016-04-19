FROM node:5.10
MAINTAINER Jeff Byrnes <thejeffbyrnes@gmail.com>

EXPOSE 3000

WORKDIR /usr/src/app

ARG VAULT_ADDR
ARG VAULT_TOKEN

CMD ["npm", "start"]

COPY package.json ./package.json
RUN npm install
COPY . ./
