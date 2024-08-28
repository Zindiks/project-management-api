import prisma from "../../utils/prisma";
import { CreateListInput } from "./lists.schema";

// CREATE BOARD
export async function createList(input: CreateListInput) {
  const { boardId, title } = input;

  try {
    return await prisma.$transaction(async (prisma) => {
      const lastList = await prisma.list.findFirst({
        where: { boardId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      const newOrder = lastList ? lastList.order + 1 : 1;

      return prisma.list.create({
        data: {
          title,
          boardId,
          order: newOrder,
        },
      });
    });
  } catch (error) {
    console.error("Error :", error);
    throw new Error("Something wrong...");
  }
}

export async function getListsByBoardId(boardId: string) {
  console.log(boardId);

  const data = await prisma.list.findMany({
    where: {
      boardId,
    },
    orderBy: {
      order: "asc",
    },
  });

  console.log(data);
  return data;
}

// // UPDATE BOARD TITLE
// export async function updateBoardTitle(input: UpdateBoardTitleInput) {
//   const { id, title } = input;

//   return prisma.board.update({
//     where: {
//       id: id, // Условие поиска по id
//     },
//     data: {
//       title: title, // Новое значение для поля title
//     },
//   });
// }

// GET BOARD BY ID

// // DELETE BOARD BY ID
// export async function deleteBoard(id: string) {
//   return prisma.board.delete({
//     where: {
//       id,
//     },
//   });
// }

// // GET BOARDS (plural) BY ORGANIZATION ID
// export async function getBoardsByOrgId(orgId: string) {
//   return prisma.board.findMany({
//     where: {
//       orgId: orgId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// }
