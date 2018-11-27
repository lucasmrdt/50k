FROM node:8.11.4
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

EXPOSE 6200

CMD [ "npm", "run", "dev" ]