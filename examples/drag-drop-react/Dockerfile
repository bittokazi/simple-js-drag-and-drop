FROM node:12-bullseye
WORKDIR /app
COPY ./ ./
COPY package*.json ./
RUN npm install
RUN npm run build
EXPOSE 5501
CMD [ "node", "server.js" ]
