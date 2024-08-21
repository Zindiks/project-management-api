import { FastifyInstance } from "fastify"
import { createBoardHandler, getAllBoardsHandler } from "./board.controller"
import { $ref } from "./board.schema"

export async function boardRoutes(server: FastifyInstance) {
  server.post(
    "/create",
    {
      schema: {
        body: $ref("createBoard"),
        response: {
          201: $ref("createBoardResponseSchema"),
        },
      },
    },
    createBoardHandler
  )

  //   server.post(
  //     "/login",
  //     {
  //       schema: {
  //         body: $ref("loginSchema"),
  //         response: {
  //           201: $ref("loginResponseSchema"),
  //         },
  //       },
  //     },
  //     loginHandler
  //   )

  server.get(
    "/all",
    // {
    //   preHandler: [server.authenticate],
    // },
    getAllBoardsHandler
  )
}
