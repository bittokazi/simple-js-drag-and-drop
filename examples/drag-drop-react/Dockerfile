FROM node:12
WORKDIR /app
COPY ./ ./
RUN npm cache clean --force
RUN npm i
RUN npm run build
COPY . .
EXPOSE 5501
CMD [ "node", "server.js" ]
