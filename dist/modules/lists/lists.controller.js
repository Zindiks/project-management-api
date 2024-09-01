"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListHandler = createListHandler;
exports.updateListsOrderHandler = updateListsOrderHandler;
exports.copyListHandler = copyListHandler;
exports.deleteListHandler = deleteListHandler;
exports.getListsByBoardIdHandler = getListsByBoardIdHandler;
exports.updateListTitleHandler = updateListTitleHandler;
const lists_service_1 = require("./lists.service");
async function createListHandler(request, reply) {
    const body = request.body;
    console.log(body);
    try {
        const list = await (0, lists_service_1.createList)(this.knex, body);
        return reply.status(200).send(list);
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
async function updateListsOrderHandler(request, reply) {
    const body = request.body;
    const { boardId } = request.params;
    // console.log("Request Body: ", body); // Log the body for debugging
    // console.log("Board ID: ", boardId); // Log the board ID for debugging
    try {
        // Call the service function that updates the lists order
        const lists = await (0, lists_service_1.updateListsOrder)(this.knex, body, boardId);
        // Send the updated lists in the response
        return reply.status(200).send(lists);
    }
    catch (err) {
        console.error("Error updating lists order: ", err); // Log the error
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}
async function copyListHandler(request, reply) {
    const body = request.body;
    try {
        const list = await (0, lists_service_1.copyList)(this.knex, body);
        return reply.status(201).send(list);
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
async function deleteListHandler(request, reply) {
    const body = request.params;
    try {
        const resp = await (0, lists_service_1.deleteList)(this.knex, body);
        return reply.status(201).send(resp);
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
async function getListsByBoardIdHandler(request, reply) {
    const { boardId } = request.params;
    try {
        const lists = await (0, lists_service_1.getListsByBoardId)(this.knex, boardId);
        if (lists) {
            return reply.status(200).send(lists);
        }
        else {
            return reply.status(404).send({ message: "no lists" });
        }
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
async function updateListTitleHandler(request, reply) {
    const body = request.body;
    try {
        const list = await (0, lists_service_1.updateListTitle)(this.knex, body);
        return reply.status(201).send(list);
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
