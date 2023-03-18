import request from "supertest";
import { server } from "../../src/server";
beforeEach(() => {
  jest.resetAllMocks();
});

// TODO: mocks all the required stuff so it can run in isolation
describe("POST /v1/auth/login", () => {
  it("Responds with token valid for accessing the API", async () => {
    const response = await request(server()).post("/v1/auth/login").send({
      username: "rio",
      password: "123",
    });

    expect(response.body.token).toBeTruthy();
  });
});
