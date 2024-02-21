FROM node:18-alpine3.18

WORKDIR /usr/app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install

COPY . /usr/app

CMD ["npm", "run", "start:dev"]
