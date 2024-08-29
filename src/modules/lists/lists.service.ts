import { Knex } from "knex";

import { CreateListInput } from "./lists.schema";

const table = "lists";

// CREATE BOARD
export async function createList(knex: Knex, input: CreateListInput) {
  const { board_id, title } = input;

  const lastList = await knex(table)
    .where({ board_id })
    .orderBy("order", "desc")
    .select("order")
    .first();

  const order = lastList ? lastList.order + 1 : 1;

  return knex(table).insert({ title, board_id, order });
}

export async function getListsByBoardId(knex: Knex, board_id: string) {
  return knex(table).where({ board_id }).orderBy("order", "asc");
}


