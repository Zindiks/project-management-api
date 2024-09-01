"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("lists", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("title").notNullable();
        table.integer("order").notNullable();
        table
            .uuid("board_id")
            .notNullable()
            .references("id")
            .inTable("boards")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    return knex.schema.dropTable("lists");
}
