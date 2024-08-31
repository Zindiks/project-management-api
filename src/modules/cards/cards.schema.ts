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

// const updateListTitle = z.object({
//   ...listId,
//   ...boardId,
//   ...listTitle,
// });

const fullCardResponseSchema = z.object({
  ...cardId,
  ...listId,
  ...cardTitle,
  ...cardOrder,
  ...listTimestamp,
});

// const deleteList = z.object({
//   ...listId,
//   ...boardId,
// });

// const deleteListResponse = z.object({
//   ...listId,
// });

// const copyList = z.object({
//   ...listId,
//   ...boardId,
// });

// const deleteBoardResponse = z.object({
//   ...boardId,
//   title: z.string(),
// });

export const fullCardsResponseSchema = z.array(fullCardResponseSchema);

export type CreateCardInput = z.infer<typeof createCard>;
// export type CopyListInput = z.infer<typeof copyList>;
// export type UpdateListTitleInput = z.infer<typeof updateListTitle>;
// export type DeleteListInput = z.infer<typeof deleteList>;
export const { schemas: cardSchemas, $ref } = buildJsonSchemas(
  {
    createCard,
    fullCardResponseSchema,
  },
  { $id: "Card" },
);
