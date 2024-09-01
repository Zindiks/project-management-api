"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
