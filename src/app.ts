import Fastify from "fastify";
import os from "os";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { boardSchemas } from "./modules/boards/boards.schema";
import { listSchemas } from "./modules/lists/lists.schema";
import { cardSchemas } from "./modules/cards/cards.schema";

import { boardRoutes } from "./modules/boards/boards.route";
import { listRoutes } from "./modules/lists/lists.route";
import { cardRoutes } from "./modules/cards/cards.route";

import fastifyMetrics, { IMetricsPluginOptions } from "fastify-metrics";

import cors from "@fastify/cors";
import knexPlugin from "./db/knexPlugin";

const server = Fastify({
  logger: {
    level: "info",
    // file: "./logs/app.log",
  },
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(knexPlugin);

server.register(import("@fastify/swagger"), {
  openapi: {
    info: {
      title: "API Documentation",
      description: "API for managing borders and lists",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
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

async function main() {
  for (const schema of [...boardSchemas, ...listSchemas, ...cardSchemas]) {
    server.addSchema(schema);
  }

  await server.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

server.get("/check", (req, reply) => {
  const hostname = os.hostname(); 
  const htmlResponse = `<html><body><h1>Server Hostname v2: ${hostname}</h1></body></html>`;

  reply
    .type("text/html")
    .send(htmlResponse); 
});

  server.listen(
    {
      port: 4000,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`Server listening at ${address}`);
    },
  );
}

main();
