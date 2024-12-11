import { FastifyInstance } from "fastify";
import { createServer } from "../../bootstrap"; 
import { config } from "../../configs/config";
import {
  CreateBoardInput,
  DeleteBoardInput,
  UpdateBoardTitleInput,
} from "./boards.schema";

let app: FastifyInstance;

beforeAll(async () => {
  app = await createServer();
  await app.listen(
    {
      port: config.api.port + 1,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`Server listening at ${address}`);
    },
  );
});

afterAll(async () => {
  await app.close();
});

describe("Boards API", () => {
  let boardId: string;

  it("should create a new board", async () => {
    const createBoardInput: CreateBoardInput = {
      title: "Test Board",
      org_id: "org123",
      image_id: "img123",
      image_thumb_url: "http://example.com/thumb.jpg",
      image_full_url: "http://example.com/full.jpg",
      image_link_html: "<a href='http://example.com'>Link</a>",
      image_username: "user123",
    };

    const response = await app.inject({
      method: "POST",
      url: "api/boards/create",
      payload: createBoardInput,
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body).toHaveProperty("id");
    boardId = body.id;
  });

  it("should update the board title", async () => {
    const updateBoardTitleInput: UpdateBoardTitleInput = {
      id: boardId,
      title: "Updated Test Board",
    };

    const response = await app.inject({
      method: "PATCH",
      url: "api/boards/update",
      payload: updateBoardTitleInput,
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.title).toBe("Updated Test Board");
  });

  it("should get the board by id", async () => {
    const response = await app.inject({
      method: "GET",
      url: `api/boards/${boardId}`,
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.id).toBe(boardId);
  });

  it("should get all boards by org id", async () => {
    const response = await app.inject({
      method: "GET",
      url: `api/boards/all/org123`,
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it("should delete the board", async () => {
    const deleteBoardInput: DeleteBoardInput = {
      id: boardId,
    };

    const response = await app.inject({
      method: "DELETE",
      url: `api/boards/${boardId}`,
      payload: deleteBoardInput,
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.id).toBe(boardId);
  });
});
