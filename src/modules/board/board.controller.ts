import { FastifyReply, FastifyRequest } from "fastify"
import { createBoard, deleteBoard, getAllBoards } from "./board.service"
import { CreatBoardInput, DeleteBoardInput } from "./board.schema"

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

export async function deleteBoardHandler(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply
) {
  const { id } = request.params

  try {
    const deleted = await deleteBoard(id)

    console.log(deleted)

    if (deleted) {
      return reply.status(200).send(deleted)
    } else {
      return reply.status(404).send({ message: "id not found" })
    }
  } catch (err) {
    return reply.status(500).send(err)
  }
}

// export async function loginHandler(
//   request: FastifyRequest<{ Body: LoginInput }>,
//   reply: FastifyReply
// ) {
//   const body = request.body

//   //find a user by email

//   const user = await findUserByEmail(body.email)

//   if (!user) {
//     return reply.status(401).send({
//       message: "Invalid email or password",
//     })
//   }

//   //verify password

//   const correctPassword = verifyPassword({
//     candidatePassword: body.password,
//     salt: user.salt,
//     hash: user.password,
//   })
//   //generate token

//   if (correctPassword) {
//     const { password, salt, ...rest } = user

//     return { accessToken: server.jwt.sign(rest) }
//   }

//   return reply.status(401).send({
//     message: "Invalid email or password",
//   })
//   //respond
// }

export async function getAllBoardsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const boards = await getAllBoards()

  return reply.status(200).send(boards)
}
