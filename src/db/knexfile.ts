import { Knex } from "knex";


//postgres_container


const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
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
