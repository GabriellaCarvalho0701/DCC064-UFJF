FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update && apt-get install -y npm
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "ts-node", "./index.ts"]