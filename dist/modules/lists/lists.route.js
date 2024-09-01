"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoutes = listRoutes;
const lists_controller_1 = require("./lists.controller");
const lists_schema_1 = require("./lists.schema");
async function listRoutes(server) {
    //POST:
    server.post("/create", {
        schema: {
            body: (0, lists_schema_1.$ref)("createList"),
            response: {
                201: (0, lists_schema_1.$ref)("fullListResponseSchema"),
            },
            tags: ["Lists"],
        },
    }, lists_controller_1.createListHandler);
    // UPDATE ORDER
    //TODO: DO I REALLY HAVE TO RETURN FULL LISTS RESPONSE SCHEMA? MAYBE STATUS IS ENOUGH?
    server.put("/order/:boardId", {
        schema: {
            body: (0, lists_schema_1.$ref)("updateListsOrder"),
            response: {
                200: (0, lists_schema_1.$ref)("fullListsResponseSchema"),
            },
            tags: ["Lists"],
            params: {
                boardId: { type: "string" },
            },
        },
    }, lists_controller_1.updateListsOrderHandler);
    // plural
    server.get("/:boardId", {
        schema: {
            response: {
                200: (0, lists_schema_1.$ref)("fullListsResponseSchema"),
            },
            tags: ["Lists"],
        },
    }, lists_controller_1.getListsByBoardIdHandler);
    //FIX: IM CONFUSED! Is it good practise to include body to DELETE METHOD
    server.delete("/:id/board/:board_id", {
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
                200: (0, lists_schema_1.$ref)("deleteListResponse"),
            },
            tags: ["Lists"],
        },
    }, lists_controller_1.deleteListHandler);
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
    server.patch("/update", {
        schema: {
            body: (0, lists_schema_1.$ref)("updateListTitle"),
            response: {
                201: (0, lists_schema_1.$ref)("fullListResponseSchema"),
            },
            tags: ["Lists"],
        },
    }, lists_controller_1.updateListTitleHandler);
    server.post("/copy", {
        schema: {
            body: (0, lists_schema_1.$ref)("copyList"),
            response: {
                201: (0, lists_schema_1.$ref)("fullListResponseSchema"),
            },
            tags: ["Lists"],
        },
    }, lists_controller_1.copyListHandler);
}
