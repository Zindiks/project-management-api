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

  // knex returns an array. Now the only solution is to just get first element
  return data;
}

// GET LISTS BY ID
// export async function getListsByBoardId(knex: Knex, board_id: string) {

//   const data = await knex(table)
//     .where({ board_id })
//     .orderBy("order", "asc")
//     .returning("*");

//   return data
// }

export async function getListsByBoardId(knex: Knex, board_id: string) {
  const data = await knex("lists")
    .select(
      "lists.*",
      knex.raw("json_agg(cards.* ORDER BY cards.order ASC) as cards"),
    )
    .leftJoin("cards", "lists.id", "cards.list_id")
    .where({ "lists.board_id": board_id })
    .groupBy("lists.id")
    .orderBy("lists.order", "asc");

  return data;
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

    // Execute all the queries within the transaction
    await Promise.all(queries);

    // const updatedLists = await trx(table)
    //   .select("*")
    //   .where({ board_id })
    //   .orderBy("order", "asc");

    // // Return the updated lists
    // return updatedLists;
  });
}

// DELETE LIST
export async function deleteList(knex: Knex, input: DeleteListInput) {
  const { id, board_id } = input;

  const [deletedBoard] = await knex(table)
    .where({ id, board_id })
    .del()
    .returning("*");

  return deletedBoard;
}

export async function copyList(knex: Knex, input: CopyListInput) {
  const { id, board_id } = input;

  // Fetch the list to copy, including its associated cards
  const origin = await knex("lists")
    .select("lists.*", knex.raw("json_agg(cards.*) as cards"))
    .leftJoin("cards", "lists.id", "cards.list_id")
    .where({ "lists.id": id, "lists.board_id": board_id })
    .groupBy("lists.id")
    .first();

  if (!origin) {
    throw new Error("List not found"); // Handle case where the list does not exist
  }

  const lastList = await knex("lists")
    .where({ board_id })
    .orderBy("order", "desc")
    .select("order")
    .first();

  // Calculate the new list's order
  const newOrder = lastList ? lastList.order + 1 : 1;

  const { title, cards } = origin;

  // Start a transaction for creating the list and copying its cards
  const list = await knex.transaction(async (trx) => {
    // Insert the new list
    const [newList] = await trx("lists")
      .insert({
        title: `${title} copy`,
        order: newOrder,
        board_id,
      })
      .returning("*");

    // Insert the associated cards, if any
    if (
      cards &&
      Array.isArray(cards) &&
      cards.length > 0 &&
      cards[0] !== null
    ) {
      const cardsData = cards.map((card) => ({
        title: card.title,
        description: card.description,
        order: card.order,
        list_id: newList.id, // Associate the new cards with the new list
      }));

      await trx("cards").insert(cardsData);
    }

    return newList;
  });

  return list;
}
