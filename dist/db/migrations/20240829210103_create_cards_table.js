"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("cards", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("title").notNullable();
        table.integer("order").notNullable();
        table.text("description");
        table
            .uuid("list_id")
            .notNullable()
            .references("id")
            .inTable("lists")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    return knex.schema.dropTable("cards");
}
