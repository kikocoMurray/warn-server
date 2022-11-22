FROM node:latest

WORKDIR /usr/src/app

COPY dist /usr/src/app/dist
COPY package.json /usr/src/app

CMD [ "yarn", "start" ]