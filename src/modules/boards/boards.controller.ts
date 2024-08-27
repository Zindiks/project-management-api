import { FastifyReply, FastifyRequest } from "fastify"
import {
  createBoard,
  deleteBoard,
  getBoardsByOrgId,
  getBoardById,
  updateBoardTitle,
} from "./boards.service"
import {
  CreatBoardInput,
  DeleteBoardInput,
  UpdateBoardTitleInput,
} from "./boards.schema"

// CREATE BOARD
export async function createBoardHandler(
  request: FastifyRequest<{
    Body: CreatBoardInput
  }>,
  reply: FastifyReply
) {
  const body = request.body
  console.log(body)

  try {
    const board = await createBoard(body)
    return reply.status(201).send(board)
  } catch (err) {
    return reply.status(500).send(err)
  }
}

// UPDATE BOARD TITLE
export async function updateBoardTitleHandler(
  request: FastifyRequest<{
    Body: UpdateBoardTitleInput
  }>,
  reply: FastifyReply
) {
  const body = request.body

  console.log(body)

  try {
    const board = await updateBoardTitle(body)
    return reply.status(201).send(board)
  } catch (err) {
    return reply.status(500).send(err)
  }
}

// DELETE BOARD BY ID
export async function deleteBoardHandler(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply
) {
  const { id } = request.params

  try {
    const deleted = await deleteBoard(id)

    if (deleted) {
      return reply.status(200).send(deleted)
    } else {
      return reply.status(404).send({ message: "id not found" })
    }
  } catch (err) {
    return reply.status(500).send(err)
  }
}

// GET BOARD BY ID
export async function getBoardByIdHandler(
  request: FastifyRequest<{
    Params: { boardId: string }
  }>,
  reply: FastifyReply
) {
  const { boardId } = request.params

  try {
    const board = await getBoardById(boardId)
    if (board) {
      return reply.status(200).send(board)
    } else {
      return reply.status(404).send({ message: "board not found" })
    }
  } catch (err) {
    return reply.status(500).send(err)
  }
}

// GET ALL BOARDS BY ORGANIZATION ID
export async function getAllBoardsHandler(
  request: FastifyRequest<{
    Params: { orgId: string }
  }>,
  reply: FastifyReply
) {
  const { orgId } = request.params

  try {
    const boards = await getBoardsByOrgId(orgId)

    if (boards) {
      return reply.status(200).send(boards)
    } else {
      return reply.status(404).send({ message: "id not found" })
    }
  } catch (err) {
    return reply.status(500).send(err)
  }
}
