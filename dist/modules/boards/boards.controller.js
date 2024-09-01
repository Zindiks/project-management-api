"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoardHandler = createBoardHandler;
exports.updateBoardTitleHandler = updateBoardTitleHandler;
exports.deleteBoardHandler = deleteBoardHandler;
exports.getBoardByIdHandler = getBoardByIdHandler;
exports.getAllBoardsHandler = getAllBoardsHandler;
const boards_service_1 = require("./boards.service");
// CREATE BOARD
async function createBoardHandler(request, reply) {
    const body = request.body;
    try {
        const board = await (0, boards_service_1.createBoard)(this.knex, body);
        return reply.status(201).send(board);
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
// UPDATE BOARD TITLE
async function updateBoardTitleHandler(request, reply) {
    const body = request.body;
    try {
        const board = await (0, boards_service_1.updateBoardTitle)(this.knex, body);
        return reply.status(201).send(board);
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
// DELETE BOARD BY ID
async function deleteBoardHandler(request, reply) {
    try {
        const deleted = await (0, boards_service_1.deleteBoard)(this.knex, request.params);
        if (deleted) {
            return reply.status(200).send(deleted);
        }
        else {
            return reply.status(404).send({ message: "id not found" });
        }
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
// GET BOARD BY ID
async function getBoardByIdHandler(request, reply) {
    const { boardId } = request.params;
    try {
        const board = await (0, boards_service_1.getBoardById)(this.knex, boardId);
        if (board) {
            return reply.status(200).send(board);
        }
        else {
            return reply.status(404).send({ message: "board not found" });
        }
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
// GET ALL BOARDS BY ORGANIZATION ID
async function getAllBoardsHandler(request, reply) {
    const { orgId } = request.params;
    try {
        const boards = await (0, boards_service_1.getBoardsByOrgId)(this.knex, orgId);
        if (boards) {
            return reply.status(200).send(boards);
        }
        else {
            return reply.status(404).send({ message: "id not found" });
        }
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
