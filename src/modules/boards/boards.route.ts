import { FastifyInstance } from "fastify"
import {
  createBoardHandler,
  deleteBoardHandler,
  getAllBoardsHandler,
  getBoardByIdHandler,
  updateBoardTitleHandler,
} from "./boards.controller"
import { $ref } from "./boards.schema"

export async function boardRoutes(server: FastifyInstance) {
  //POST:
  server.post(
    "/create",
    {
      schema: {
        body: $ref("createBoard"),
        response: {
          201: $ref("fullBoardResponseSchema"),
        },
      },
    },
    createBoardHandler
  )

  //DELETE:
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

  //GET:

  server.get(
    "/:boardId",
    {
      schema: {
        response: {
          200: $ref("fullBoardResponseSchema"),
        },
      },
    },
    getBoardByIdHandler
  )

  server.get(
    "/all/:orgId",
    {
      schema: {
        response: {
          200: $ref("boardsResponseSchema"),
        },
      },
    },
    getAllBoardsHandler
  )

  //UPDATE:

  server.patch(
    "/update",
    {
      schema: {
        body: $ref("updateBoardTitle"),
        response: {
          201: $ref("fullBoardResponseSchema"),
        },
      },
    },
    updateBoardTitleHandler
  )
}
