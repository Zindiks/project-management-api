import { FastifyInstance } from "fastify";
import {
  createCardHandler,
  getCardByIdHandler,
  updateCardsOrderHandler,
} from "./cards.controller";
import { $ref } from "./cards.schema";

export async function cardRoutes(server: FastifyInstance) {
  //POST:
  server.post(
    "/create",
    {
      schema: {
        body: $ref("createCard"),
        response: {
          201: $ref("fullCardResponseSchema"),
        },
        tags: ["Cards"],
      },
    },
    createCardHandler,
  );

  server.put(
    "/order/:listId",
    {
      schema: {
        body: $ref("updateCardsOrder"),
        response: {
          200: $ref("fullCardResponseSchema"),
        },
        tags: ["Cards"],
        params: {
          boardId: { type: "string" },
        },
      },
    },
    updateCardsOrderHandler,
  );

  server.get(
    "/:cardId",
    {
      schema: {
        response: {
          200: $ref("fullCardResponseSchema"),
        },
        tags: ["Cards"],
      },
    },
    getCardByIdHandler,
  );
}
