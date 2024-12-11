import dotenv from "dotenv";

dotenv.config();

export const config = {
  api: {
    port: Number(process.env.API_PORT) || 4000,
    host: process.env.API_HOST || "localhost",
  },
  client: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    host: process.env.CLIENT_HOST || "localhost",
  },
  knex: {
    host: process.env.KNEX_HOST || "localhost",
    username: process.env.KNEX_USERNAME || "postgres",
    password: process.env.KNEX_PASSWORD || "password",
    database: process.env.KNEX_DATABASE || "trello-clone-api",
  },
};
