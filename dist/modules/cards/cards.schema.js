"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.cardSchemas = exports.fullCardsResponseSchema = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const cardId = {
    id: zod_1.z.string(),
};
const listId = {
    list_id: zod_1.z.string(),
};
const cardOrder = {
    order: zod_1.z.number(),
};
const cardTitle = {
    title: zod_1.z
        .string({
        required_error: "title is required",
    })
        .min(3, "Title must be at least 3 characters"),
};
// const listRest = {
//   ...listTitle,
//   order: z.number()
// };
const listTimestamp = {
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
};
//
const createCard = zod_1.z.object({
    ...listId,
    ...cardTitle,
});
const fullCardResponseSchema = zod_1.z.object({
    ...cardId,
    ...listId,
    ...cardTitle,
    ...cardOrder,
    ...listTimestamp,
});
const updateCardOrder = zod_1.z.object({
    ...listId,
    ...cardId,
    ...cardOrder,
});
const updateCardsOrder = zod_1.z.array(updateCardOrder);
exports.fullCardsResponseSchema = zod_1.z.array(fullCardResponseSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createCard,
    fullCardResponseSchema,
    updateCardOrder,
    updateCardsOrder,
}, { $id: "cards" }), exports.cardSchemas = _a.schemas, exports.$ref = _a.$ref;
