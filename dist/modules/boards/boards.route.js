"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRoutes = boardRoutes;
const boards_controller_1 = require("./boards.controller");
const boards_schema_1 = require("./boards.schema");
async function boardRoutes(server) {
    //POST:
    server.post("/create", {
        schema: {
            body: (0, boards_schema_1.$ref)("createBoard"),
            response: {
                201: (0, boards_schema_1.$ref)("fullBoardResponseSchema"),
            },
            description: "Create a Board",
            tags: ["Boards"],
        },
    }, boards_controller_1.createBoardHandler);
    //DELETE:
    server.delete("/:id", {
        schema: {
            response: {
                200: (0, boards_schema_1.$ref)("deleteBoardResponse"),
            },
            description: "Delete a Board by id",
            tags: ["Boards"],
        },
    }, boards_controller_1.deleteBoardHandler);
    //GET:
    server.get("/:boardId", {
        schema: {
            response: {
                200: (0, boards_schema_1.$ref)("fullBoardResponseSchema"),
            },
            description: "",
            tags: ["Boards"],
        },
    }, boards_controller_1.getBoardByIdHandler);
    server.get("/all/:orgId", {
        schema: {
            response: {
                200: (0, boards_schema_1.$ref)("boardsResponseSchema"),
            },
            tags: ["Boards"],
        },
    }, boards_controller_1.getAllBoardsHandler);
    //UPDATE:
    server.patch("/update", {
        schema: {
            body: (0, boards_schema_1.$ref)("updateBoardTitle"),
            response: {
                201: (0, boards_schema_1.$ref)("fullBoardResponseSchema"),
            },
            description: "change board title",
            tags: ["Boards"],
        },
    }, boards_controller_1.updateBoardTitleHandler);
}
