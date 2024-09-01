FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm install pm2 -g

COPY . .

RUN npm run build

# Установка переменных окружения
ENV KNEX_PASSWORD=

EXPOSE 4000

CMD ["pm2-runtime", "dist/app.js"]