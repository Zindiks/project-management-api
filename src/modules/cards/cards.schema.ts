import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const cardId = {
  id: z.string(),
};

const listId = {
  list_id: z.string(),
};

const cardOrder = {
  order: z.number(),
};

const cardTitle = {
  title: z
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
  created_at: z.date(),
  updated_at: z.date(),
};

//
const createCard = z.object({
  ...listId,
  ...cardTitle,
});

const fullCardResponseSchema = z.object({
  ...cardId,
  ...listId,
  ...cardTitle,
  ...cardOrder,
  ...listTimestamp,
});

const updateCardOrder = z.object({
  ...listId,
  ...cardId,
  ...cardOrder,
});

const updateCardsOrder = z.array(updateCardOrder);

export const fullCardsResponseSchema = z.array(fullCardResponseSchema);

export type CreateCardInput = z.infer<typeof createCard>;
export type UpdatedCardOrderInput = z.infer<typeof updateCardOrder>;
export type UpdatedCardsOrderInput = z.infer<typeof updateCardsOrder>;

export const { schemas: cardSchemas, $ref } = buildJsonSchemas(
  {
    createCard,
    fullCardResponseSchema,
    updateCardOrder,
    updateCardsOrder,
  },
  { $id: "Card" },
);
