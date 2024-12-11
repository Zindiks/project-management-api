import { Knex } from "knex";

import {
  CreateBoardInput,
  DeleteBoardInput,
  UpdateBoardTitleInput,
} from "./boards.schema";

// CREATE BOARD
export async function createBoard(knex: Knex, input: CreateBoardInput) {
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
  const board = await knex("boards")
    .where({ id: board_id })
    .select("*")
    .first();

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
