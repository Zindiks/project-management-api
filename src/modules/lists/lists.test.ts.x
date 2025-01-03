import Knex, { Knex as KnexType } from "knex";
import {
  createList,
  getListsByBoardId,
  updateListTitle,
  updateListsOrder,
  deleteList,
  copyList,
} from "./lists.service";
import {
  CreateListInput,
  UpdateListTitleInput,
  UpdateListsOrderInput,
  DeleteListInput,
  CopyListInput,
} from "./lists.schema";

const knex: KnexType = Knex({ client: "sqlite3", connection: { filename: ":memory:" } });

beforeAll(async () => {
  await knex.schema.createTable("lists", (table: KnexType.CreateTableBuilder) => {
    table.string("id").primary();
    table.string("board_id");
    table.string("title");
    table.integer("list_order");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("cards", (table: KnexType.CreateTableBuilder) => {
    table.string("id").primary();
    table.string("title");
    table.string("description");
    table.integer("card_order");
    table.string("list_id");
    table.timestamps(true, true);
  });
});

beforeEach(async () => {
  await knex('lists').truncate();
  await knex('cards').truncate();
  await knex('lists').insert([
    { id: '1', board_id: 'board1', title: 'List 1', list_order: 1 },
    { id: '2', board_id: 'board1', title: 'List 2', list_order: 2 },
  ]);
  await knex('cards').insert([
    { id: '1', title: 'Card 1', description: 'Description 1', card_order: 1, list_id: '1' },
    { id: '2', title: 'Card 2', description: 'Description 2', card_order: 2, list_id: '1' },
  ]);
});

afterAll(async () => {
  await knex.schema.dropTableIfExists("lists");
  await knex.schema.dropTableIfExists("cards");
  await knex.destroy();
});

describe("List Service", () => {
  it("should create a list", async () => {
    const input: CreateListInput = { board_id: "board1", title: "Test List" };
    const list = await createList(knex, input);
    expect(list).toHaveProperty("id");
    expect(list.title).toBe("Test List");

    const lists = await getListsByBoardId(knex, "board1");
    expect(lists).toHaveLength(3);
  });

  it("should get lists by board id", async () => {
    const lists = await getListsByBoardId(knex, "board1");
    expect(Array.isArray(lists)).toBe(true);
    expect(lists.length).toBe(2);
  });

  it("should update list title", async () => {
    const input: UpdateListTitleInput = { id: "1", board_id: "board1", title: "Updated Title" };
    const list = await updateListTitle(knex, input);
    expect(list.title).toBe("Updated Title");

    const updatedList = await knex('lists').where({ id: "1" }).first();
    expect(updatedList.title).toBe("Updated Title");
  });

  it("should update lists order", async () => {
    const input: UpdateListsOrderInput = [{ id: "1", board_id: "board1", list_order: 2 }];
    await updateListsOrder(knex, input, "board1");
    const lists = await getListsByBoardId(knex, "board1");
    expect(lists.find(list => list.id === "1").list_order).toBe(2);
  });

  it("should delete a list", async () => {
    const input: DeleteListInput = { id: "1", board_id: "board1" };
    const list = await deleteList(knex, input);
    expect(list).not.toBeNull();
    expect(list).toHaveProperty("id");

    const lists = await getListsByBoardId(knex, "board1");
    expect(lists).toHaveLength(1);
  });

  it("should copy a list", async () => {
    const input: CopyListInput = { id: "1", board_id: "board1" };
    const list = await copyList(knex, input);
    expect(list.title).toContain("copy");

    const lists = await getListsByBoardId(knex, "board1");
    expect(lists).toHaveLength(3);
  });
});
