import request from "supertest";
import { server } from "../../src/server";
import { UserMockDBAdapter } from "../../src/database/drivers/mockDatabase/user.model";
beforeEach(() => {
  jest.resetAllMocks();
});

describe("POST /v1/auth/login", () => {
  it("Responds with token valid for accessing the API", async () => {
    const db = UserMockDBAdapter;

    db.findOne = jest.fn().mockImplementation((cb) => {
      cb({});
      return {
        id: "0",
        is_admin: false,
        password: "123",
      };
    });
    const response = await request(server()).post("/v1/auth/login").send({
      username: "testNonAdmin",
      password: "123",
    });

    expect(db.findOne).toBeCalledTimes(1);
    expect(response.body.token).toBeTruthy();
  });

  it("Responds with UnauthorizedError because username is invalid", async () => {
    const db = UserMockDBAdapter;

    db.findOne = jest.fn().mockImplementation((cb) => {
      cb({});
      return null;
    });
    const response = await request(server()).post("/v1/auth/login").send({
      username: "testNonAdmin",
      password: "123",
    });

    expect(db.findOne).toBeCalledTimes(1);
    expect(response.statusCode).toEqual(401);
    expect(response.body.error.id).toEqual(1003);
    expect(response.body.error.name).toEqual("UnauthorizedAccessError");
  });

  it("Responds with UnauthorizedError because password is wrong", async () => {
    const db = UserMockDBAdapter;

    db.findOne = jest.fn().mockImplementation((cb) => {
      cb({});
      return {
        id: "0",
        is_admin: false,
        password: "PASSWORD",
      };
    });
    const response = await request(server()).post("/v1/auth/login").send({
      username: "testNonAdmin",
      password: "123",
    });

    expect(db.findOne).toBeCalledTimes(1);
    expect(response.statusCode).toEqual(401);
    expect(response.body.error.id).toEqual(1003);
    expect(response.body.error.name).toEqual("UnauthorizedAccessError");
  });
});
