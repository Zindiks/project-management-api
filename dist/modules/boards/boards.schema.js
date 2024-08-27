"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.boardSchemas = void 0;
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
const boardRest = Object.assign(Object.assign({}, boardTitle), {
  orgId: zod_1.z.string(),
  imageId: zod_1.z.string(),
  imageThumbUrl: zod_1.z.string(),
  imageFullUrl: zod_1.z.string(),
  imageLinkHTML: zod_1.z.string(),
  imageUserName: zod_1.z.string(),
});
const boardTimestamp = {
  createdAt: zod_1.z.date(),
  updatedAt: zod_1.z.date(),
};
//
const createBoard = zod_1.z.object(Object.assign({}, boardRest));
const updateBoardTitle = zod_1.z.object(
  Object.assign(Object.assign({}, boardId), boardTitle),
);
const fullBoardResponseSchema = zod_1.z.object(
  Object.assign(
    Object.assign(Object.assign({}, boardId), boardRest),
    boardTimestamp,
  ),
);
const deleteBoard = zod_1.z.object(Object.assign({}, boardId));
const deleteBoardResponse = zod_1.z.object(
  Object.assign(Object.assign({}, boardId), { title: zod_1.z.string() }),
);
const boardsResponseSchema = zod_1.z.array(fullBoardResponseSchema);
(_a = (0, fastify_zod_1.buildJsonSchemas)({
  createBoard,
  fullBoardResponseSchema,
  boardsResponseSchema,
  deleteBoard,
  deleteBoardResponse,
  updateBoardTitle,
})),
  (exports.boardSchemas = _a.schemas),
  (exports.$ref = _a.$ref);
