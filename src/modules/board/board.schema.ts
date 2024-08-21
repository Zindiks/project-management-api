import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"
import { title } from "process"

const createBoard = z.object({
  title: z.string({
    required_error: "title is required",
  }),
})

// const createUserSchema = z.object({
//   ...userCore,
//   password: z.string({
//     required_error: "Password is required",
//     invalid_type_error: "Password must be a string",
//   }),
// })
const createBoardResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
})

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

export type CreatBoardInput = z.infer<typeof createBoard>
// export type LoginInput = z.infer<typeof loginSchema>
export const { schemas: boardSchemas, $ref } = buildJsonSchemas({
  createBoard,
  createBoardResponseSchema
})
