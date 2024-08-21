import Fastify, { FastifyReply, FastifyRequest } from "fastify"
// import fastifyJwt from "fastify-jwt";
// import {userRoutes} from "./modules/user/user.route";
// import {userSchemas} from "./modules/user/user.schema";
// import {productSchemas} from "./modules/product/product.schema";
// import {productRoutes} from "./modules/product/product.route";
// import { version } from "../package.json"

// import swagger from "@fastify/swagger-ui"

// import {withRefResolver} from "fastify-zod";

export const server = Fastify({ logger: true })

server.get("/healthcheck", (req, res) => {
  return res.status(200).send("Ok!")
})

async function main() {
  // for (const schema of [...userSchemas, ...productSchemas]) {
  //     server.addSchema(schema);
  // }

  server.register(import("@fastify/swagger"))
  server.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  })

  // server.register(userRoutes, {
  //     prefix: "api/users"
  // });

  // server.register(productRoutes, {
  //     prefix: "api/products"
  // })

  server.get("/", (req, res) => {
    console.log(req.params)
    res.send("Hello World!")
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
