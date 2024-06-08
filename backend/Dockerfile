FROM node:20.4-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache python3 make g++ bash \
    && ln -sf python3 /usr/bin/python

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]

# CMD ["sh", "-c", "node backend/app.js & node backend/consumer.js"]
# CMD ["sh", "-c", "node /app/backend/app.js & node /app/backend/consumer.js"]
