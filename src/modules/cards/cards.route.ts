import { FastifyInstance } from "fastify";
import {
  createCardHandler
} from "./cards.controller";
import { $ref } from "./cards.schema";

export async function cardRoutes(server: FastifyInstance) {
  //POST:
  server.post(
    "/create",
    {
      schema: {
        body: $ref("createCard"),
        response: {
          201: $ref("fullCardResponseSchema"),
        },
        tags: ["Cards"],
      },
    },
    createCardHandler,
  );

  // plural
  // server.get(
  //   "/:boardId",
  //   {
  //     schema: {
  //       response: {
  //         200: $ref("fullListsResponseSchema"),
  //       },
  //       tags: ["Lists"],
  //     },
  //   },
  //   getListsByBoardIdHandler,
  // );

  //FIX: IM CONFUSED! Is it good practise to include body to DELETE METHOD

  // server.delete(
  //   "/:id/board/:board_id",
  //   {
  //     schema: {
  //       params: {
  //         type: "object",
  //         properties: {
  //           board_id: { type: "string" },
  //           id: { type: "string" },
  //         },
  //         required: ["board_id", "id"],
  //       },
  //       response: {
  //         200: $ref("deleteListResponse"),
  //       },
  //     },
  //   },
  //   deleteListHandler,
  // );

  // //GET:

  // server.get(
  //   "/all/:orgId",
  //   {
  //     schema: {
  //       response: {
  //         200: $ref("boardsResponseSchema"),
  //       },
  //     },
  //   },
  //   getAllBoardsHandler,
  // );

  // //UPDATE:

//   server.patch(
//     "/update",
//     {
//       schema: {
//         body: $ref("updateListTitle"),
//         response: {
//           201: $ref("fullListResponseSchema"),
//         },
//         tags: ["Lists"],
//       },
//     },
//     updateListTitleHandler,
//   );

//   server.post(
//     "/copy",
//     {
//       schema: {
//         body: $ref("copyList"),
//         response: {
//           201: $ref("fullListResponseSchema"),
//         },
//         tags: ["Lists"],
//       },
//     },
//     copyListHandler,
//   );
}
