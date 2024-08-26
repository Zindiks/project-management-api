import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const boardId = {
  id: z.string(),
}

const boardRest = {
  title: z
    .string({
      required_error: "title is required",
    })
    .min(3, "Title must be at least 3 characters")
    .max(36, "Title must be at most 36 characters"),
  orgId: z.string(),
  imageId: z.string(),
  imageThumbUrl: z.string(),
  imageFullUrl: z.string(),
  imageLinkHTML: z.string(),
  imageUserName: z.string(),
}

const boardTimestamp = {
  createdAt: z.date(),
  updatedAt: z.date(),
}

const createBoard = z.object({
  ...boardRest,
})

const createBoardResponseSchema = z.object({
  ...boardId,
  ...boardRest,
  ...boardTimestamp,
})

const deleteBoard = z.object({
  ...boardId,
})

const deleteBoardResponse = z.object({
  ...boardId,
  title: z.string(),
})

// const createUserSchema = z.object({
//   ...userCore,
//   password: z.string({
//     required_error: "Password is required",
//     invalid_type_error: "Password must be a string",
//   }),
// })

// const loginSchema = z.object({
//   email: z
//     .string({
//       required_error: "Email is required",
//       invalid_type_error: "Email must be a string",
//     })
//     .email(),
//   password: z.string({}),
// })

// const loginResponseSchema = z.object({
//   access_token: z.string(),
// })

const boardsResponseSchema = z.array(createBoardResponseSchema)

export type CreatBoardInput = z.infer<typeof createBoard>
export type DeleteBoardInput = z.infer<typeof deleteBoard>
// export type LoginInput = z.infer<typeof loginSchema>
export const { schemas: boardSchemas, $ref } = buildJsonSchemas({
  createBoard,
  createBoardResponseSchema,
  boardsResponseSchema,
  deleteBoard,
  deleteBoardResponse,
})
