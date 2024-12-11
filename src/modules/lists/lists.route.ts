import { FastifyInstance } from "fastify";
import {
  copyListHandler,
  createListHandler,
  deleteListHandler,
  getListsByBoardIdHandler,
  updateListsOrderHandler,
  updateListTitleHandler,
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

  // UPDATE ORDER

  server.put(
    "/order/:boardId",
    {
      schema: {
        body: $ref("updateListsOrder"),
        response: {
          200: $ref("fullListsResponseSchema"),
        },
        tags: ["Lists"],
        params: {
          boardId: { type: "string" },
        },
      },
    },
    updateListsOrderHandler,
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

  //FIX: IM CONFUSED! Is it good practise to include body to DELETE METHOD

  server.delete(
    "/:id/board/:board_id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            board_id: { type: "string" },
            id: { type: "string" },
          },
          required: ["board_id", "id"],
        },
        response: {
          200: $ref("deleteListResponse"),
        },
        tags: ["Lists"],
      },
    },
    deleteListHandler,
  );

  server.patch(
    "/update",
    {
      schema: {
        body: $ref("updateListTitle"),
        response: {
          201: $ref("fullListResponseSchema"),
        },
        tags: ["Lists"],
      },
    },
    updateListTitleHandler,
  );

  server.post(
    "/copy",
    {
      schema: {
        body: $ref("copyList"),
        response: {
          201: $ref("fullListResponseSchema"),
        },
        tags: ["Lists"],
      },
    },
    copyListHandler,
  );
}
