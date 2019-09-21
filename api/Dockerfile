FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4003
CMD [ "npm", "start" ]

#docker build -t sreetejaact/actchain-cardealerapi .