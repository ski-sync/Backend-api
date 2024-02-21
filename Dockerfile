FROM node:alpine3.19 as base

WORKDIR /app

COPY package.json /app
RUN npm install

FROM base as app-base
COPY . .
RUN npx prisma generate
RUN chmod +x build-all.sh
RUN ./build-all.sh

FROM app-base as generator
CMD [ "npx", "prisma", "db", "push" ]


FROM node:alpine3.19 as smtp
WORKDIR /app
COPY --from=app-base /app/dist/apps/smtp ./dist/apps/smtp
COPY --from=app-base /app/node_modules ./node_modules
CMD [ "node", "dist/apps/smtp/main.js" ]

FROM node:alpine3.19 as skisync
WORKDIR /app
COPY --from=app-base /app/dist/apps/skisync ./dist/apps/skisync
COPY --from=app-base /app/node_modules ./node_modules
CMD [ "node", "dist/apps/skisync/main.js" ]

FROM node:alpine3.19 as influx
WORKDIR /app
COPY --from=app-base /app/dist/apps/influx ./dist/apps/influx
COPY --from=app-base /app/node_modules ./node_modules
CMD [ "node", "dist/apps/influx/main.js" ]