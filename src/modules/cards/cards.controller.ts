import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createCard, getCardById, updateCardsOrder } from "./cards.service";
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

export async function getCardByIdHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Params: { cardId: string };
  }>,
  reply: FastifyReply,
) {
  const { cardId } = request.params;


  try {
    const card = await getCardById(this.knex, cardId);

    return reply.status(200).send(card);
  } catch (err) {
    console.error("Error updating lists order: ", err); // Log the error
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
