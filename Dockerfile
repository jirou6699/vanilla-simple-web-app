FROM node:16.16.0

COPY package*.json ./

RUN npm install

WORKDIR /app

CMD ["npx", "http-server", "-p", "8080"]
