"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.listSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const boardId = {
    boardId: zod_1.z.string(),
};
const listId = {
    id: zod_1.z.string(),
};
const listOrder = {
    order: zod_1.z.number()
};
const listTitle = {
    title: zod_1.z
        .string({
        required_error: "title is required",
    })
        .min(3, "Title must be at least 3 characters")
        .max(36, "Title must be at most 36 characters"),
};
// const listRest = {
//   ...listTitle,
//   order: z.number()
// };
const listTimestamp = {
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
};
//
const createList = zod_1.z.object({
    ...boardId,
    ...listTitle
});
// const updateBoardTitle = z.object({
//   ...boardId,
//   ...boardTitle,
// });
const fullListResponseSchema = zod_1.z.object({
    ...boardId,
    ...listTitle,
    ...listOrder,
    ...listId,
    ...listTimestamp,
});
// const deleteBoard = z.object({
//   ...boardId,
// });
// const deleteBoardResponse = z.object({
//   ...boardId,
//   title: z.string(),
// });
const fullListsResponseSchema = zod_1.z.array(fullListResponseSchema);
// export type UpdateBoardTitleInput = z.infer<typeof updateBoardTitle>;
// export type DeleteBoardInput = z.infer<typeof deleteBoard>;
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createList,
    fullListResponseSchema,
    fullListsResponseSchema,
}, { $id: "List" }), exports.listSchemas = _a.schemas, exports.$ref = _a.$ref;
