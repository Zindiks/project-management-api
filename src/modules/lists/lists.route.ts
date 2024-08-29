import { FastifyInstance } from "fastify";
import {
  createListHandler,
  getListsByBoardIdHandler,
} from "./lists.controller";
import { $ref } from "./lists.schema";

export async function listRoutes(server: FastifyInstance) {
  //POST:
  server.post(
    "/create",
    {
      schema: {
        body: $ref("createList"),
        response: {
          201: $ref("fullListResponseSchema"),
        },
        tags: ["Lists"],
      },
    },
    createListHandler,
  );

  // plural
  server.get(
    "/:boardId",
    {
      schema: {
        response: {
          200: $ref("fullListsResponseSchema"),
        },
        tags: ["Lists"],
      },
    },
    getListsByBoardIdHandler,
  );

  // //DELETE:
  // server.delete(
  //   "/:id",
  //   {
  //     schema: {
  //       response: {
  //         200: $ref("deleteBoardResponse"),
  //       },
  //     },
  //   },
  //   deleteBoardHandler,
  // );

  // //GET:

  // server.get(
  //   "/all/:orgId",
  //   {
  //     schema: {
  //       response: {
  //         200: $ref("boardsResponseSchema"),
  //       },
  //     },
  //   },
  //   getAllBoardsHandler,
  // );

  // //UPDATE:

  // server.patch(
  //   "/update",
  //   {
  //     schema: {
  //       body: $ref("updateBoardTitle"),
  //       response: {
  //         201: $ref("fullBoardResponseSchema"),
  //       },
  //     },
  //   },
  //   updateBoardTitleHandler,
  // );
}
