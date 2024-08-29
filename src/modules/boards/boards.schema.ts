import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const boardId = {
  id: z.string(),
};

const boardTitle = {
  title: z
    .string({
      required_error: "title is required",
    })
    .min(3, "Title must be at least 3 characters")
    .max(36, "Title must be at most 36 characters"),
};

const boardRest = {
  ...boardTitle,
  org_id: z.string(),
  image_id: z.string(),
  image_thumb_url: z.string(),
  image_full_url: z.string(),
  image_link_html: z.string(),
  image_username: z.string(),
};

const boardTimestamp = {
  created_at: z.date(),
  updated_at: z.date(),
};

//
const createBoard = z.object({
  ...boardRest,
});

const updateBoardTitle = z.object({
  ...boardId,
  ...boardTitle,
});

const fullBoardResponseSchema = z.object({
  ...boardId,
  ...boardRest,
  ...boardTimestamp,
});

const deleteBoard = z.object({
  ...boardId,
});

const deleteBoardResponse = z.object({
  ...boardId,
  title: z.string(),
});

const boardsResponseSchema = z.array(fullBoardResponseSchema);

export type CreatBoardInput = z.infer<typeof createBoard>;
export type UpdateBoardTitleInput = z.infer<typeof updateBoardTitle>;
export type DeleteBoardInput = z.infer<typeof deleteBoard>;
export const { schemas: boardSchemas, $ref } = buildJsonSchemas({
  createBoard,
  fullBoardResponseSchema,
  boardsResponseSchema,
  deleteBoard,
  deleteBoardResponse,
  updateBoardTitle,
});
