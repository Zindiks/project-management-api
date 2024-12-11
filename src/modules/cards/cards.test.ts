import Knex, { Knex as KnexType } from "knex";
import { createCard, updateCardsOrder, getCardById } from "./cards.service";

const knex = Knex({ client: "sqlite3", connection: { filename: ":memory:" } });

describe("Card Service", () => {
  beforeAll(async () => {
    await knex.schema.createTable("cards", (table: KnexType.TableBuilder) => {
      table.increments("id");
      table.string("list_id");
      table.string("title");
      table.integer("order");
      table.timestamps(true, true);
    });
  });

  beforeEach(async () => {
    await knex("cards").truncate();
    await knex("cards").insert([
      { id: 1, list_id: "list1", title: "Card 1", order: 1 },
      { id: 2, list_id: "list1", title: "Card 2", order: 2 },
    ]);
  });

  afterAll(async () => {
    await knex.schema.dropTable("cards");
    await knex.destroy();
  });

  describe("createCard", () => {
    it("should create a new card", async () => {
      const input = { list_id: "list1", title: "Test Card" };
      const card = await createCard(knex, input);
      expect(card).toHaveProperty("id");
      expect(card.title).toBe(input.title);
      expect(card.list_id).toBe(input.list_id);
    });
  });

  describe("updateCardsOrder", () => {
    it("should update the order of cards", async () => {
      const input = [
        { id: "1", list_id: "list1", order: 2 },
        { id: "2", list_id: "list1", order: 1 },
      ];
      await updateCardsOrder(knex, input, "list1");
      const cards = await knex("cards")
        .where({ list_id: "list1" })
        .orderBy("order");
      expect(cards[0].order).toBe(1);
      expect(cards[1].order).toBe(2);
    });
  });

  describe("getCardById", () => {
    it("should get a card by id", async () => {
      const card = await getCardById(knex, "1");
      expect(card).toHaveProperty("id", 1);
    });
  });
});
