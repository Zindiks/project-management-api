"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = createBoard;
exports.updateBoardTitle = updateBoardTitle;
exports.getBoardById = getBoardById;
exports.deleteBoard = deleteBoard;
exports.getBoardsByOrgId = getBoardsByOrgId;
// CREATE BOARD
async function createBoard(knex, input) {
    const [newBoard] = await knex("boards").insert(input).returning("*");
    return newBoard;
}
// UPDATE BOARD TITLE
async function updateBoardTitle(knex, input) {
    const { id, title } = input;
    const [updatedBoard] = await knex("boards")
        .where({ id })
        .update({ title })
        .returning("*");
    return updatedBoard;
}
// GET BOARD BY ID
async function getBoardById(knex, board_id) {
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
async function deleteBoard(knex, input) {
    const [deleted] = await knex("boards")
        .where(input)
        .del()
        .returning(["id", "title"]);
    return deleted;
}
// GET BOARDS (plural) BY ORGANIZATION ID
async function getBoardsByOrgId(knex, org_id) {
    return knex("boards")
        .where({ org_id })
        .orderBy("created_at", "desc")
        .select("*");
}
