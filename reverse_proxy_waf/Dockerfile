FROM node:12-slim

WORKDIR /waf

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "waf.js"]
