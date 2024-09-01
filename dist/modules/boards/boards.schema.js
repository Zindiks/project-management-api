"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.boardSchemas = exports.deleteBoardResponse = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const boardId = {
    id: zod_1.z.string(),
};
const boardTitle = {
    title: zod_1.z
        .string({
        required_error: "title is required",
    })
        .min(3, "Title must be at least 3 characters")
        .max(36, "Title must be at most 36 characters"),
};
const boardRest = {
    ...boardTitle,
    org_id: zod_1.z.string(),
    image_id: zod_1.z.string(),
    image_thumb_url: zod_1.z.string(),
    image_full_url: zod_1.z.string(),
    image_link_html: zod_1.z.string(),
    image_username: zod_1.z.string(),
};
const boardTimestamp = {
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
};
//
const createBoard = zod_1.z.object({
    ...boardRest,
});
const updateBoardTitle = zod_1.z.object({
    ...boardId,
    ...boardTitle,
});
const fullBoardResponseSchema = zod_1.z.object({
    ...boardId,
    ...boardRest,
    ...boardTimestamp,
});
const deleteBoard = zod_1.z.object({
    ...boardId,
});
exports.deleteBoardResponse = zod_1.z.object({
    ...boardId,
    title: zod_1.z.string(),
});
const boardsResponseSchema = zod_1.z.array(fullBoardResponseSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createBoard,
    fullBoardResponseSchema,
    boardsResponseSchema,
    deleteBoard,
    deleteBoardResponse: exports.deleteBoardResponse,
    updateBoardTitle,
}, { $id: "boards" }), exports.boardSchemas = _a.schemas, exports.$ref = _a.$ref;
