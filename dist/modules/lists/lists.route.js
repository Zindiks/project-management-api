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
            tags: ["List"],
        },
    }, lists_controller_1.createListHandler);
    // plural
    server.get("/:boardId", {
        schema: {
            response: {
                200: (0, lists_schema_1.$ref)("fullListsResponseSchema"),
            },
            tags: ["Lists"],
        },
    }, lists_controller_1.getListsByBoardIdHandler);
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
