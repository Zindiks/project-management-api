import { Knex } from "knex";

import { CreateListInput, UpdateListTitleInput } from "./lists.schema";

const table = "lists";

// CREATE LIST
export async function createList(knex: Knex, input: CreateListInput) {
  const { board_id, title } = input;

  const lastList = await knex(table)
    .where({ board_id })
    .orderBy("order", "desc")
    .select("order")
    .first();

  const order = lastList ? lastList.order + 1 : 1;

  const data = await knex(table)
    .insert({ title, board_id, order })
    .returning("*");

  // knex returns an array. Now the only solution is to just get first element
  return data[0];
}

// GET LISTS BY ID
export async function getListsByBoardId(knex: Knex, board_id: string) {
  return knex(table).where({ board_id }).orderBy("order", "asc").returning("*");
}

// UPDATE LIST TITLE
export async function updateListTitle(knex: Knex, input: UpdateListTitleInput) {
  const { id, board_id, title } = input;

  const [updatedBoard ]= await knex("lists")
    .where({ id, board_id })
    .update({ title })
    .returning("*");

  return updatedBoard;
}
