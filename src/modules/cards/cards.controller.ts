import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createCard, updateCardsOrder } from "./cards.service";
import { CreateCardInput, UpdatedCardsOrderInput } from "./cards.schema";

export async function createCardHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Body: CreateCardInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;


  try {
    const resp = await createCard(this.knex, body);
    return reply.status(200).send(resp);
  } catch (err) { 
    return reply.status(500).send(err);
  }
}


export async function updateCardsOrderHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Body: UpdatedCardsOrderInput;
    Params: { listId: string };
  }>,
  reply: FastifyReply,
) {
  const body = request.body;
  const { listId } = request.params;


  try {
    const lists = await updateCardsOrder(this.knex, body, listId);

    return reply.status(200).send(lists);
  } catch (err) {
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
