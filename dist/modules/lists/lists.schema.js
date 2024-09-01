"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.listSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
// Shared Fields
const listId = {
    id: zod_1.z.string(),
};
const boardId = {
    board_id: zod_1.z.string(),
};
const listOrder = {
    order: zod_1.z.number(),
};
const listTitle = {
    title: zod_1.z
        .string({
        required_error: "Title is required",
    })
        .min(3, "Title must be at least 3 characters")
        .max(36, "Title must be at most 36 characters"),
};
const listTimestamp = {
    created_at: zod_1.z.string().datetime(),
    updated_at: zod_1.z.string().datetime(),
};
// Cards Schema
const cardSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().nullable(),
    order: zod_1.z.number(),
    list_id: zod_1.z.string(),
    created_at: zod_1.z.string().datetime(),
    updated_at: zod_1.z.string().datetime(),
});
// Schema for creating a list
const createList = zod_1.z.object({
    ...boardId,
    ...listTitle,
});
// Schema for updating a list's title
const updateListTitle = zod_1.z.object({
    ...listId,
    ...boardId,
    ...listTitle,
});
const updateListOrder = zod_1.z.object({
    ...listId,
    ...boardId,
    ...listOrder,
});
// Full response schema for a list, including cards
const fullListResponseSchema = zod_1.z.object({
    ...boardId,
    ...listTitle,
    ...listOrder,
    ...listId,
    ...listTimestamp,
    cards: zod_1.z.array(cardSchema).optional().default([]), //Optional
});
// Schema for deleting a list
const deleteList = zod_1.z.object({
    ...listId,
    ...boardId,
});
// Response schema after deleting a list
const deleteListResponse = zod_1.z.object({
    ...listId,
});
// Schema for copying a list
const copyList = zod_1.z.object({
    ...listId,
    ...boardId,
});
// Response schema for multiple lists
const fullListsResponseSchema = zod_1.z.array(fullListResponseSchema);
const updateListsOrder = zod_1.z.array(updateListOrder);
// Build JSON Schemas with Fastify-Zod
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createList,
    updateListTitle,
    fullListResponseSchema,
    fullListsResponseSchema,
    deleteList,
    deleteListResponse,
    copyList,
    updateListsOrder,
}, { $id: "lists" }), exports.listSchemas = _a.schemas, exports.$ref = _a.$ref;
