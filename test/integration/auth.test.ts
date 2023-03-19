import request from "supertest";
import { server } from "../../src/server";
beforeEach(() => {
  jest.resetAllMocks();
});

describe("GET /v1/admin/borrow/list", () => {
  it("Responds with an error because the token is invalid", async () => {
    const response = await request(server())
      .get("/v1/admin/borrow/list")
      .set("Authorization", `Bearer `);

    expect(response.statusCode).toEqual(401);
    expect(response.body.error.id).toEqual(1008);
    expect(response.body.error.name).toEqual("JsonWebTokenError");
  });
});

describe("GET /v1/borrow", () => {
  it("Responds with an error because the token is invalid", async () => {
    const response = await request(server())
      .get("/v1/borrow")
      .set("Authorization", `Bearer `);

    expect(response.statusCode).toEqual(401);
    expect(response.body.error.id).toEqual(1008);
    expect(response.body.error.name).toEqual("JsonWebTokenError");
  });
});

describe("GET /", () => {
  it("Responds with a welcome message", async () => {
    const response = await request(server()).get("/");

    expect(response.body.data).toEqual("OK");
  });
});
