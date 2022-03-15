FROM node:12
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
RUN npm run build
COPY . .
EXPOSE 5501
CMD [ "node", "server.js" ]
