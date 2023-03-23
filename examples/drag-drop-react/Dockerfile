FROM node:12-bullseye
WORKDIR /app
COPY ./ ./
COPY package*.json ./
RUN npm install
EXPOSE 5501
CMD [ "node", "server.js" ]
