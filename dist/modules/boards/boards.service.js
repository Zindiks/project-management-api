"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = createBoard;
exports.updateBoardTitle = updateBoardTitle;
exports.getBoardById = getBoardById;
exports.deleteBoard = deleteBoard;
exports.getBoardsByOrgId = getBoardsByOrgId;
const prisma_1 = __importDefault(require("../../utils/prisma"));
// CREATE BOARD
async function createBoard(input) {
  return prisma_1.default.board.create({
    data: input,
  });
}
// UPDATE BOARD TITLE
async function updateBoardTitle(input) {
  const { id, title } = input;
  return prisma_1.default.board.update({
    where: {
      id: id, // Условие поиска по id
    },
    data: {
      title: title, // Новое значение для поля title
    },
  });
}
// GET BOARD BY ID
//TODO: add <orgId> for better security
async function getBoardById(boardId) {
  return prisma_1.default.board.findUnique({
    where: {
      id: boardId,
    },
  });
}
// DELETE BOARD BY ID
async function deleteBoard(id) {
  return prisma_1.default.board.delete({
    where: {
      id,
    },
  });
}
// GET BOARDS (plural) BY ORGANIZATION ID
async function getBoardsByOrgId(orgId) {
  return prisma_1.default.board.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
