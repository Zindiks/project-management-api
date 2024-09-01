"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("boards", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("title").notNullable();
        table.string("org_id").notNullable();
        table.string("image_id").notNullable();
        table.text("image_thumb_url").notNullable();
        table.text("image_full_url").notNullable();
        table.text("image_link_html").notNullable();
        table.text("image_username").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    return knex.schema.dropTable("boards");
}
