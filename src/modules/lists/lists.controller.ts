import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  copyList,
  createList,
  deleteList,
  getListsByBoardId,
  updateListsOrder,
  updateListTitle,
} from "./lists.service";
import {
  CopyListInput,
  CreateListInput,
  DeleteListInput,
  UpdateListsOrderInput,
  UpdateListTitleInput,
} from "./lists.schema";

export async function createListHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Body: CreateListInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;
  console.log(body);

  try {
    const list = await createList(this.knex, body);
    return reply.status(200).send(list);
  } catch (err) {
    return reply.status(500).send(err);
  }
}

export async function updateListsOrderHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Body: UpdateListsOrderInput;
    Params: { boardId: string };
  }>,
  reply: FastifyReply,
) {
  const body = request.body;
  const { boardId } = request.params;

  // console.log("Request Body: ", body); // Log the body for debugging
  // console.log("Board ID: ", boardId); // Log the board ID for debugging

  try {
    // Call the service function that updates the lists order
    const lists = await updateListsOrder(this.knex, body, boardId);

    // Send the updated lists in the response
    return reply.status(200).send(lists);
  } catch (err) {
    console.error("Error updating lists order: ", err); // Log the error
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

export async function copyListHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Body: CopyListInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const list = await copyList(this.knex, body);
    return reply.status(201).send(list);
  } catch (err) {
    return reply.status(500).send(err);
  }
}

export async function deleteListHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Params: DeleteListInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.params;

  try {
    const resp = await deleteList(this.knex, body);

    return reply.status(201).send(resp);
  } catch (err) {
    return reply.status(500).send(err);
  }
}

export async function getListsByBoardIdHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Params: { boardId: string };
  }>,
  reply: FastifyReply,
) {
  const { boardId } = request.params;

  try {
    const lists = await getListsByBoardId(this.knex, boardId);
    if (lists) {
      return reply.status(200).send(lists);
    } else {
      return reply.status(404).send({ message: "no lists" });
    }
  } catch (err) {
    return reply.status(500).send(err);
  }
}

export async function updateListTitleHandler(
  this: FastifyInstance,
  request: FastifyRequest<{
    Body: UpdateListTitleInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;
  try {
    const list = await updateListTitle(this.knex, body);
    return reply.status(201).send(list);
  } catch (err) {
    return reply.status(500).send(err);
  }
}
