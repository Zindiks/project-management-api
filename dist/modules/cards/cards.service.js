"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = createCard;
exports.updateCardsOrder = updateCardsOrder;
const table = "cards";
// CREATE LIST
async function createCard(knex, input) {
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
async function updateCardsOrder(knex, input, list_id) {
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
// // GET LISTS BY ID
// export async function getListsByBoardId(knex: Knex, board_id: string) {
//   return knex(table).where({ board_id }).orderBy("order", "asc").returning("*");
// }
// // UPDATE LIST TITLE
// export async function updateListTitle(knex: Knex, input: UpdateListTitleInput) {
//   const { id, board_id, title } = input;
//   const [updatedBoard] = await knex("lists")
//     .where({ id, board_id })
//     .update({ title })
//     .returning("*");
//   return updatedBoard;
// }
// // DELETE LIST
// export async function deleteList(knex: Knex, input: DeleteListInput) {
//   const { id, board_id } = input;
//   const [deletedBoard] = await knex(table)
//     .where({ id, board_id })
//     .del()
//     .returning("*");
//   return deletedBoard;
// }
// export async function copyList(knex: Knex, input: CopyListInput) {
//   const { id, board_id } = input;
//   //   const origin = (await knex("lists").where({id,board_id}))
//   // const listToCopy = await knex("lists")
//   //   .select("lists.*", knex.raw("json_agg(cards.*) as cards"))
//   //   .leftJoin("cards", "lists.id", "cards.list_id")
//   //   .where({ "lists.id": id, "lists.board_id": board_id })
//   //   .groupBy("lists.id")
//   //   .first();
//   const origin = await knex(table)
//     .select("lists.*", knex.raw("json_agg(cards.*) as cards"))
//     .leftJoin("cards", "lists.id", "cards.list_id")
//     .where({ "lists.id": id, "lists.board_id": board_id })
//     .groupBy("lists.id")
//     .first();
//   const lastList = await knex(table)
//     .where({ board_id })
//     .orderBy("order", "desc")
//     .select("order")
//     .first();
//   const order = lastList ? lastList.order + 1 : 1;
//   const { title, cards } = origin;
//   const list = await knex.transaction(async (trx) => {
//     const [newList] = await knex(table)
//       .insert({ title: `${title} copy`, order, board_id })
//       .returning("*");
//     if (
//       cards &&
//       Array.isArray(cards) &&
//       cards.length > 0 &&
//       cards[0] !== null
//     ) {
//       const cardsData = cards.map((card) => ({
//         title: card.title,
//         description: card.description,
//         order: card.order,
//         list_id: newList.id,
//       }));
//       await trx("cards").insert(cardsData).returning("*");
//     }
//     return newList;
//   });
//   return list;
// }
// list = await prisma.list.create({
//   data:{
//     board_id,
//     title,
//     order,
//     cards:{
//       createMany:{
//         data: resp.cards.map((card)=>({
//           title: card.title,
//           description: card.description,
//           order: card.order
//         }))
//       }
//     }
//   }
// })
