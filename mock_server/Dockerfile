FROM node:12-slim

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .
RUN ls -l

EXPOSE 3000

CMD ["node", "app.js"]
