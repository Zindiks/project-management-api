import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// Shared Fields
const listId = {
  id: z.string(),
};

const boardId = {
  board_id: z.string(),
};

const listOrder = {
  order: z.number(),
};

const listTitle = {
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title must be at least 3 characters")
    .max(36, "Title must be at most 36 characters"),
};

const listTimestamp = {
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
};

// Cards Schema
const cardSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  order: z.number(),
  list_id: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Schema for creating a list
const createList = z.object({
  ...boardId,
  ...listTitle,
});

// Schema for updating a list's title
const updateListTitle = z.object({
  ...listId,
  ...boardId,
  ...listTitle,
});

const updateListOrder = z.object({
  ...listId,
  ...boardId,
  ...listOrder,
});

// Full response schema for a list, including cards
const fullListResponseSchema = z.object({
  ...boardId,
  ...listTitle,
  ...listOrder,
  ...listId,
  ...listTimestamp,
  cards: z.array(cardSchema).optional().default([]), // Optional
});

// Schema for deleting a list
const deleteList = z.object({
  ...listId,
  ...boardId,
});

// Response schema after deleting a list
const deleteListResponse = z.object({
  ...listId,
});

// Schema for copying a list
const copyList = z.object({
  ...listId,
  ...boardId,
});

// Response schema for multiple lists
const fullListsResponseSchema = z.array(fullListResponseSchema);

const updateListsOrder = z.array(updateListOrder);

// Type Definitions
export type CreateListInput = z.infer<typeof createList>;
export type CopyListInput = z.infer<typeof copyList>;
export type UpdateListTitleInput = z.infer<typeof updateListTitle>;
export type UpdateListsOrderInput = z.infer<typeof updateListsOrder>;
export type DeleteListInput = z.infer<typeof deleteList>;
export type FullListsInput = z.infer<typeof fullListsResponseSchema>;

// Build JSON Schemas with Fastify-Zod
export const { schemas: listSchemas, $ref } = buildJsonSchemas(
  {
    createList,
    updateListTitle,
    fullListResponseSchema,
    fullListsResponseSchema,
    deleteList,
    deleteListResponse,
    copyList,
    updateListsOrder,
  },
  { $id: "lists" },
);
