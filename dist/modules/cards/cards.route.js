"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRoutes = cardRoutes;
const cards_controller_1 = require("./cards.controller");
const cards_schema_1 = require("./cards.schema");
async function cardRoutes(server) {
    //POST:
    server.post("/create", {
        schema: {
            body: (0, cards_schema_1.$ref)("createCard"),
            response: {
                201: (0, cards_schema_1.$ref)("fullCardResponseSchema"),
            },
            tags: ["Cards"],
        },
    }, cards_controller_1.createCardHandler);
    server.put("/order/:listId", {
        schema: {
            body: (0, cards_schema_1.$ref)("updateCardsOrder"),
            response: {
                200: (0, cards_schema_1.$ref)("fullCardResponseSchema"),
            },
            tags: ["Lists"],
            params: {
                boardId: { type: "string" },
            },
        },
    }, cards_controller_1.updateCardsOrderHandler);
    // plural
    // server.get(
    //   "/:boardId",
    //   {
    //     schema: {
    //       response: {
    //         200: $ref("fullListsResponseSchema"),
    //       },
    //       tags: ["Lists"],
    //     },
    //   },
    //   getListsByBoardIdHandler,
    // );
    //FIX: IM CONFUSED! Is it good practise to include body to DELETE METHOD
    // server.delete(
    //   "/:id/board/:board_id",
    //   {
    //     schema: {
    //       params: {
    //         type: "object",
    //         properties: {
    //           board_id: { type: "string" },
    //           id: { type: "string" },
    //         },
    //         required: ["board_id", "id"],
    //       },
    //       response: {
    //         200: $ref("deleteListResponse"),
    //       },
    //     },
    //   },
    //   deleteListHandler,
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
    //   server.patch(
    //     "/update",
    //     {
    //       schema: {
    //         body: $ref("updateListTitle"),
    //         response: {
    //           201: $ref("fullListResponseSchema"),
    //         },
    //         tags: ["Lists"],
    //       },
    //     },
    //     updateListTitleHandler,
    //   );
    //   server.post(
    //     "/copy",
    //     {
    //       schema: {
    //         body: $ref("copyList"),
    //         response: {
    //           201: $ref("fullListResponseSchema"),
    //         },
    //         tags: ["Lists"],
    //       },
    //     },
    //     copyListHandler,
    //   );
}
