import { FastifyInstance } from "fastify"
import {
  createBoardHandler,
  deleteBoardHandler,
  getAllBoardsHandler,
} from "./board.controller"
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

  server.delete(
    "/:id",
    {
      schema: {
        response: {
          200: $ref("deleteBoardResponse"),
        },
      },
    },
    deleteBoardHandler
  )


  server.get(
    "/all",
    {
      schema: {
        response: {
          200: $ref("boardsResponseSchema"),
        },
      },
    },
    getAllBoardsHandler
  )
}
