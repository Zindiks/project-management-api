FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

RUN npm run build

RUN npx prisma generate

CMD ["pm2-runtime", "dist/app.js"]


EXPOSE 4000