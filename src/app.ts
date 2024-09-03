// import fastifyJwt from "fastify-jwt";
// import {userRoutes} from "./modules/user/user.route";
// import {userSchemas} from "./modules/user/user.schema";
// import {productSchemas} from "./modules/product/product.schema";
// import {productRoutes} from "./modules/product/product.route";
// import { version } from "../package.json"
// import swagger from "@fastify/swagger-ui"
// import {withRefResolver} from "fastify-zod";

import Fastify from "fastify";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { boardSchemas } from "./modules/boards/boards.schema";
import { listSchemas } from "./modules/lists/lists.schema";
import { cardSchemas } from "./modules/cards/cards.schema";

import { boardRoutes } from "./modules/boards/boards.route";
import { listRoutes } from "./modules/lists/lists.route";
import { cardRoutes } from "./modules/cards/cards.route";

import fastifyMetrics, { IMetricsPluginOptions } from "fastify-metrics"

import cors from "@fastify/cors";
import knexPlugin from "./db/knexPlugin";

const server = Fastify({
  logger: {
    level: "info",
    file: "./logs/app.log",
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
