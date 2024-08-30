import { Knex } from "knex";

import {
  CreatBoardInput,
  DeleteBoardInput,
  UpdateBoardTitleInput,
} from "./boards.schema";

// CREATE BOARD
export async function createBoard(knex: Knex, input: CreatBoardInput) {
  const [newBoard] = await knex("boards").insert(input).returning("*");
  return newBoard;
}

// UPDATE BOARD TITLE
export async function updateBoardTitle(
  knex: Knex,
  input: UpdateBoardTitleInput,
) {
  const { id, title } = input;

  const [updatedBoard] = await knex("boards")
    .where({ id })
    .update({ title })
    .returning("*");
    
  return updatedBoard;
}

// GET BOARD BY ID
export async function getBoardById(knex: Knex, board_id: string) {
  // Instead of JOIN tables I will try this approach. 3 fetches instead one big massive fetch... Actually, at current state it doesnt't realy matter

  const board = await knex("boards")
    .where({ id: board_id })
    .select("*")
    .first();

  // I will test this approach later
  // .leftJoin("lists", "boards.id", "lists.board_id").leftJoin("cards", "lists.id", "cards.lists_id");

  // if (board) {
  //   const lists = await knex("lists").where({ board_id }).select("*");

  //   for (const list of lists) {
  //     list.cards = await knex("cards").where({ list_id: list.id }).select("*");
  //   }

  //   board.lists = lists;
  // }

  return board;
}

// DELETE BOARD BY ID
export async function deleteBoard(knex: Knex, input: DeleteBoardInput) {
  const [deleted] = await knex("boards")
    .where(input)
    .del()
    .returning(["id", "title"]);

  return deleted;
}

// GET BOARDS (plural) BY ORGANIZATION ID
export async function getBoardsByOrgId(knex: Knex, org_id: string) {
  return knex("boards")
    .where({ org_id })
    .orderBy("created_at", "desc")
    .select("*");
}
