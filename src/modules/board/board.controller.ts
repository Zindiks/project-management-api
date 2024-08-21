import { FastifyReply, FastifyRequest } from "fastify"
import { createBoard, getAllBoards } from "./board.service"
import { CreatBoardInput } from "./board.schema"

export async function createBoardHandler(
  request: FastifyRequest<{
    Body: CreatBoardInput
  }>,
  reply: FastifyReply
) {
  const body = request.body
  try {
    const board = await createBoard(body)
    return reply.status(201).send(board)
  } catch (err) {
    console.log(err)
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

export async function getAllBoardsHandler() {
  return getAllBoards
}
