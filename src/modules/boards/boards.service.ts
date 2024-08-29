import prisma from "../../utils/prisma";
import {
  CreatBoardInput,
  DeleteBoardInput,
  UpdateBoardTitleInput,
} from "./boards.schema";

// CREATE BOARD
export async function createBoard(input: CreatBoardInput) {
  return prisma.board.create({
    data: input,
  });
}

// UPDATE BOARD TITLE
export async function updateBoardTitle(input: UpdateBoardTitleInput) {
  const { id, title } = input;

  return prisma.board.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });
}

// GET BOARD BY ID
//TODO: add <orgId> for better security
export async function getBoardById(boardId: string) {
  const data = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
    include: {
      lists: {
        include: {
          cards: true,
        },
      },
    },
  });

  console.log(data);

  return data;
}

// DELETE BOARD BY ID
export async function deleteBoard(id: string) {
  return prisma.board.delete({
    where: {
      id,
    },
  });
}

// GET BOARDS (plural) BY ORGANIZATION ID
export async function getBoardsByOrgId(orgId: string) {
  return prisma.board.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
