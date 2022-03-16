FROM node:12:22
WORKDIR /app
COPY ./ ./
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm i
RUN npm run build
COPY . .
EXPOSE 5501
CMD [ "node", "server.js" ]
