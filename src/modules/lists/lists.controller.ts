import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  createList,
  getListsByBoardId,
  updateListTitle,
} from "./lists.service";
import { CreateListInput, UpdateListTitleInput } from "./lists.schema";

// CREATE BOARD
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

// // UPDATE BOARD TITLE
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

// // DELETE BOARD BY ID
// export async function deleteBoardHandler(
//   request: FastifyRequest<{
//     Params: { id: string };
//   }>,
//   reply: FastifyReply,
// ) {
//   const { id } = request.params;

//   try {
//     const deleted = await deleteBoard(id);

//     if (deleted) {
//       return reply.status(200).send(deleted);
//     } else {
//       return reply.status(404).send({ message: "id not found" });
//     }
//   } catch (err) {
//     return reply.status(500).send(err);
//   }
// }

// // GET BOARD BY ID
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

// // GET ALL BOARDS BY ORGANIZATION ID
// export async function getAllBoardsHandler(
//   request: FastifyRequest<{
//     Params: { orgId: string };
//   }>,
//   reply: FastifyReply,
// ) {
//   const { orgId } = request.params;

//   try {
//     const boards = await getBoardsByOrgId(orgId);

//     if (boards) {
//       return reply.status(200).send(boards);
//     } else {
//       return reply.status(404).send({ message: "id not found" });
//     }
//   } catch (err) {
//     return reply.status(500).send(err);
//   }
// }
