FROM node:latest

ARG PORT = 3000
ARG DATABASE_URL = "mongodb://localhost:27017/notes"
ARG MODE_ENV = development

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE ${PORT}

CMD ["npm", "start"]