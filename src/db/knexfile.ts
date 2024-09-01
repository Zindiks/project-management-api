import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "postgres",
      password: "password",
      database: "trello-clone-api",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "migrations",
    },
  },
};

export default config;
