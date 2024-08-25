import prisma from "../../utils/prisma"
import { CreatBoardInput, DeleteBoardInput } from "./board.schema"

export async function createBoard(input: CreatBoardInput) {
  return prisma.board.create({
    data: input,
  })
}


export async function deleteBoard(id: string){
  return prisma.board.delete({
    where:{
      id
    }
  })
}

// export async function findUserByEmail(email: string) {
//   return prisma.user.findUnique({ where: { email } })
// }

export async function getAllBoards() {
  return prisma.board.findMany()

}
