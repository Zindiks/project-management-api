import { Knex } from "knex";

import {
  CopyListInput,
  CreateListInput,
  DeleteListInput,
  FullListsInput,
  UpdateListsOrderInput,
  UpdateListTitleInput,
} from "./lists.schema";

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

  const [data] = await knex(table)
    .insert({ title, board_id, order })
    .returning("*");

  return data;
}

export async function getListsByBoardId(knex: Knex, board_id: string) {
  return knex("lists")
    .leftJoin("cards", "lists.id", "cards.list_id")
    .select(
      "lists.*",
      knex.raw(
        `json_group_array(
          json_object(
            'id', cards.id,
            'title', cards.title,
            'description', cards.description,
            'order', cards.order,
            'list_id', cards.list_id
          )
        ) as cards`
      )
    )
    .where("lists.board_id", board_id)
    .groupBy("lists.id")
    .orderBy("lists.order", "asc");
}

// UPDATE LIST TITLE
export async function updateListTitle(knex: Knex, input: UpdateListTitleInput) {
  const { id, board_id, title } = input;

  const [updatedBoard] = await knex("lists")
    .where({ id, board_id })
    .update({ title })
    .returning("*");

  return updatedBoard;
}

// UPDATE LIST ORDER

export async function updateListsOrder(
  knex: Knex,
  input: UpdateListsOrderInput,
  board_id: string,
) {
  return knex.transaction(async (trx) => {
    const queries = input.map((list) => {
      return trx(table)
        .where({
          id: list.id,
          board_id,
        })
        .update({
          order: list.order,
        });
    });

    await Promise.all(queries);
  });
}

// DELETE LIST
export async function deleteList(knex: Knex, input: DeleteListInput) {
  const { id, board_id } = input;
  const deletedBoard = await knex("lists")
    .where({ id, board_id })
    .del()
    .returning("*");
  return deletedBoard[0];
}

export async function copyList(knex: Knex, input: CopyListInput) {
  const { id, board_id } = input;
  const list = await knex("lists")
    .leftJoin("cards", "lists.id", "cards.list_id")
    .select(
      "lists.*",
      knex.raw(
        `json_group_array(
          json_object(
            'id', cards.id,
            'title', cards.title,
            'description', cards.description,
            'order', cards.order,
            'list_id', cards.list_id
          )
        ) as cards`
      )
    )
    .where("lists.id", id)
    .andWhere("lists.board_id", board_id)
    .groupBy("lists.id")
    .first();

  const newList = {
    ...list,
    id: undefined,
    title: `${list.title} copy`,
  };

  const [createdList] = await knex("lists").insert(newList).returning("*");

  const cards = JSON.parse(list.cards);
  for (const card of cards) {
    await knex("cards").insert({
      ...card,
      id: undefined,
      list_id: createdList.id,
    });
  }

  return createdList;
}
