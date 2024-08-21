import Fastify, { FastifyReply, FastifyRequest } from "fastify"
// import fastifyJwt from "fastify-jwt";
// import {userRoutes} from "./modules/user/user.route";
// import {userSchemas} from "./modules/user/user.schema";
// import {productSchemas} from "./modules/product/product.schema";
// import {productRoutes} from "./modules/product/product.route";
// import { version } from "../package.json"

// import swagger from "@fastify/swagger-ui"

import { boardSchemas } from "./modules/board/board.schema"
import { boardRoutes } from "./modules/board/board.route"

// import {withRefResolver} from "fastify-zod";

import cors from "@fastify/cors"

export const server = Fastify({ logger: true })

server.get("/healthcheck", (req, res) => {
  return res.status(200).send("Ok!")
})

async function main() {
  for (const schema of [...boardSchemas]) {
    server.addSchema(schema)
  }

  await server.register(cors, {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })

  server.register(import("@fastify/swagger"))
  server.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  })

  server.register(boardRoutes, {
    prefix: "api/boards",
  })

  // server.register(productRoutes, {
  //     prefix: "api/products"
  // })

  server.get("/", (req, res) => {
    console.log(req.params)
    res.send({ data: "lolo" })
  })

  server.listen(
    {
      port: 4000,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) {
        server.log.error(err)
        process.exit(1)
      }
      server.log.info(`Server listening at ${address}`)
    }
  )
}

main()
