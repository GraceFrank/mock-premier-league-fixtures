FROM node:10.16.3

WORKDIR /usr/src/mock-premier-league

COPY package*.json ./

RUN npm install

CMD [ "/bin/bash source.env" ]