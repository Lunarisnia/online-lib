import request from "supertest";
import { server } from "../../src/server";
import jwt from "jsonwebtoken";
import { serverConfig } from "../../src/config/components/server.config";
import { BorrowingScheduleMockDBAdapter } from "../../src/database/drivers/mockDatabase/borrowingSchedule.model";
beforeEach(() => {
  jest.resetAllMocks();
});

const adminToken = jwt.sign(
  { user_id: "0", is_admin: true },
  serverConfig.jwtSecret
);

const userToken = jwt.sign(
  { user_id: "1", is_admin: false },
  serverConfig.jwtSecret
);

describe("GET /v1/admin/borrow/list", () => {
  it("Responds with the list of appointment from all users", async () => {
    const mockResult = [
      {
        title: "MockBook",
      },
    ];
    const db = BorrowingScheduleMockDBAdapter;

    db.findAll = jest.fn().mockImplementation((cb) => {
      cb({});
      return mockResult;
    });

    const response = await request(server())
      .get("/v1/admin/borrow/list")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(db.findAll).toBeCalledTimes(1);
    expect(response.body.page_size).toEqual(10);
    expect(response.body.page_number).toEqual(1);
    expect(response.body.appointments).toHaveLength(1);
    expect(response.body.appointments[0].title).toEqual("MockBook");
  });

  it("Responds with an error because the request is not from an admin", async () => {
    const response = await request(server())
      .get("/v1/admin/borrow/list")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toEqual(401);
    expect(response.body.error.id).toEqual(1003);
    expect(response.body.error.name).toEqual("UnauthorizedAccessError");
  });
  it("Responds with an error because the token is invalid", async () => {
    const response = await request(server())
      .get("/v1/admin/borrow/list")
      .set("Authorization", `Bearer `);

    expect(response.statusCode).toEqual(401);
    expect(response.body.error.id).toEqual(1008);
    expect(response.body.error.name).toEqual("JsonWebTokenError");
  });
});
