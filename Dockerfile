FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install pm2 -g

EXPOSE 4000

CMD ["pm2-runtime", "dist/app.js"]