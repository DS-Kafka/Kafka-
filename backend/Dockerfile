FROM node:20.4-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ bash \
    && ln -sf python3 /usr/bin/python

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
