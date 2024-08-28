import Fastify, { FastifyReply, FastifyRequest } from "fastify";
// import fastifyJwt from "fastify-jwt";
// import {userRoutes} from "./modules/user/user.route";
// import {userSchemas} from "./modules/user/user.schema";
// import {productSchemas} from "./modules/product/product.schema";
// import {productRoutes} from "./modules/product/product.route";
// import { version } from "../package.json"
// import swagger from "@fastify/swagger-ui"
// import {withRefResolver} from "fastify-zod";

import { boardSchemas } from "./modules/boards/boards.schema";
import { listSchemas } from "./modules/lists/lists.schema";
import { boardRoutes } from "./modules/boards/boards.route";

import cors from "@fastify/cors";
import { listRoutes } from "./modules/lists/lists.route";

export const server = Fastify({ logger: true });

server.get("/healthcheck", (req, res) => {
  return res.status(200).send("Ok!");
});

async function main() {
  for (const schema of [...boardSchemas,...listSchemas]) {
    server.addSchema(schema);
  }

  await server.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  server.register(import("@fastify/swagger"));
  server.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  });

  server.register(boardRoutes, {
    prefix: "api/boards",
  });

  server.register(listRoutes, {
    prefix: "api/lists",
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
