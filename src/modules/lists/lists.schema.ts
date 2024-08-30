import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const boardId = {
  board_id: z.string(),
};

const listId = {
  id: z.string(),
};

const listOrder = {
  order: z.number()
}

const listTitle = {
  title: z
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
  created_at: z.date(),
  updated_at: z.date(),
};

//
const createList = z.object({
  ...boardId,
  ...listTitle
});

const updateListTitle = z.object({
  ...listId,
  ...boardId,
  ...listTitle,
});

const fullListResponseSchema = z.object({
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

const fullListsResponseSchema = z.array(fullListResponseSchema);

export type CreateListInput = z.infer<typeof createList>;
export type UpdateListTitleInput = z.infer<typeof updateListTitle>;
// export type DeleteBoardInput = z.infer<typeof deleteBoard>;
export const { schemas: listSchemas, $ref } = buildJsonSchemas(
  {
    createList,
    updateListTitle,
    fullListResponseSchema,
    fullListsResponseSchema,
  },
  { $id: "List" },
);
