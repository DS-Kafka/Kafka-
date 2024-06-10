FROM node:20.4-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ bash \
    && ln -sf python3 /usr/bin/python

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]