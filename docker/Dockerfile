FROM node:20.7.0-alpine

WORKDIR /app

COPY package.json ./
COPY .env ./.env
COPY src ./src


RUN npm install

CMD ["sh", "-c", "npm run start"]