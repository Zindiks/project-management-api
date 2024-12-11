import { Knex } from "knex";

import { CreateCardInput, UpdatedCardsOrderInput } from "./cards.schema";

const table = "cards";

// CREATE LIST
export async function createCard(knex: Knex, input: CreateCardInput) {
  const { list_id, title } = input;

  //TODO: Check if list_id exists!

  const lastCard = await knex(table)
    .where({ list_id })
    .orderBy("order", "desc")
    .select("order")
    .first();

  const order = lastCard ? lastCard.order + 1 : 1;

  const [data] = await knex(table)
    .insert({ title, list_id, order })
    .returning("*");

  return data;
}

//FIX:TODO: WRONG ORDER
export async function updateCardsOrder(
  knex: Knex,
  input: UpdatedCardsOrderInput,
  list_id: string,
) {
  await knex.transaction(async (trx) => {
    for (const card of input) {
      console.log(card.order);
      await trx(table)
        .where({
          id: card.id,
        })
        .update({
          order: card.order,
          list_id: card.list_id,
        });
    }
  });
}

export async function getCardById(knex: Knex, card_id: string) {
  console.log("Hello");
  console.log(card_id);

  const [data] = await knex(table).where({ id: card_id }).returning("*");

  return data;
}
