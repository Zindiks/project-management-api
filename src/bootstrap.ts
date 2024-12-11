import Fastify from "fastify";
import os from "os";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { boardSchemas } from "./modules/boards/boards.schema";
import { listSchemas } from "./modules/lists/lists.schema";
import { cardSchemas } from "./modules/cards/cards.schema";
import { boardRoutes } from "./modules/boards/boards.route";
import { listRoutes } from "./modules/lists/lists.route";
import { cardRoutes } from "./modules/cards/cards.route";
import fastifyMetrics from "fastify-metrics";
import cors from "@fastify/cors";
import knexPlugin from "./db/knexPlugin";
import { config } from "./configs/config";

export async function createServer() {
  const server = Fastify({
    logger: {
      level: "info",
      // file: "./logs/app.log", // to store logs in a file
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  server.register(knexPlugin);

  server.register(import("@fastify/swagger"), {
    openapi: {
      info: {
        title: "API Documentation",
        description: "API for managing borders, lists and cards",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://" + config.api.host + ":" + config.api.port,
        },
      ],
      components: {},
      security: [],
    },
  });

  server.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  });

  server.register(boardRoutes, {
    prefix: "api/boards",
  });

  server.register(listRoutes, {
    prefix: "api/lists",
  });

  server.register(cardRoutes, {
    prefix: "api/cards",
  });

  server.register(fastifyMetrics, {
    endpoint: "/metrics",
  });

  for (const schema of [...boardSchemas, ...listSchemas, ...cardSchemas]) {
    server.addSchema(schema);
  }

  await server.register(cors, {
    origin: "http://" + config.client.host + ":" + config.client.port,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  server.get("/health", (req, reply) => {
    const hostname = os.hostname();
    const htmlResponse = `<html><body><h1>Server Hostname v2: ${hostname}</h1></body></html>`;

    reply.type("text/html").status(200).send(htmlResponse);
  });

  return server;
}
