"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardHandler = createCardHandler;
exports.updateCardsOrderHandler = updateCardsOrderHandler;
exports.getCardByIdHandler = getCardByIdHandler;
const cards_service_1 = require("./cards.service");
async function createCardHandler(request, reply) {
    const body = request.body;
    try {
        const resp = await (0, cards_service_1.createCard)(this.knex, body);
        return reply.status(200).send(resp);
    }
    catch (err) {
        return reply.status(500).send(err);
    }
}
async function updateCardsOrderHandler(request, reply) {
    const body = request.body;
    const { listId } = request.params;
    try {
        const lists = await (0, cards_service_1.updateCardsOrder)(this.knex, body, listId);
        return reply.status(200).send(lists);
    }
    catch (err) {
        console.error("Error updating lists order: ", err); // Log the error
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}
async function getCardByIdHandler(request, reply) {
    const { cardId } = request.params;
    try {
        const card = await (0, cards_service_1.getCardById)(this.knex, cardId);
        return reply.status(200).send(card);
    }
    catch (err) {
        console.error("Error updating lists order: ", err); // Log the error
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}
// export async function updateListTitleHandler(
//   this: FastifyInstance,
//   request: FastifyRequest<{
//     Body: UpdateListTitleInput;
//   }>,
//   reply: FastifyReply,
// ) {
//   const body = request.body;
//   try {
//     const list = await updateListTitle(this.knex, body);
//     return reply.status(201).send(list);
//   } catch (err) {
//     return reply.status(500).send(err);
//   }
// }
// export async function copyListHandler(
//   this: FastifyInstance,
//   request: FastifyRequest<{
//     Body: CopyListInput;
//   }>,
//   reply: FastifyReply,
// ) {
//   const body = request.body;
//   try {
//     const list = await copyList(this.knex, body);
//     return reply.status(201).send(list);
//   } catch (err) {
//     return reply.status(500).send(err);
//   }
// }
// export async function deleteListHandler(
//   this: FastifyInstance,
//   request: FastifyRequest<{
//     Params: DeleteListInput;
//   }>,
//   reply: FastifyReply,
// ) {
//   const body = request.params;
//   try {
//     const resp = await deleteList(this.knex, body);
//     return reply.status(201).send(resp);
//   } catch (err) {
//     return reply.status(500).send(err);
//   }
// }
// export async function getListsByBoardIdHandler(
//   this: FastifyInstance,
//   request: FastifyRequest<{
//     Params: { boardId: string };
//   }>,
//   reply: FastifyReply,
// ) {
//   const { boardId } = request.params;
//   try {
//     const lists = await getListsByBoardId(this.knex, boardId);
//     if (lists) {
//       return reply.status(200).send(lists);
//     } else {
//       return reply.status(404).send({ message: "no lists" });
//     }
//   } catch (err) {
//     return reply.status(500).send(err);
//   }
// }
