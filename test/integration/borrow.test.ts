import request from "supertest";
import { server } from "../../src/server";
import jwt from "jsonwebtoken";
import { serverConfig } from "../../src/config/components/server.config";
import { BorrowingScheduleMockDBAdapter } from "../../src/database/drivers/mockDatabase/borrowingSchedule.model";
import { Library } from "../../src/services/library/library";
beforeEach(() => {
  jest.resetAllMocks();
});

const token = jwt.sign(
  { user_id: "0", is_admin: false },
  serverConfig.jwtSecret
);

describe("GET /v1/borrow", () => {
  it("Responds with the list of books from the subject", async () => {
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
      .get("/v1/borrow")
      .set("Authorization", `Bearer ${token}`);

    expect(db.findAll).toBeCalledTimes(1);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toEqual("MockBook");
  });
});

describe("POST /v1/borrow", () => {
  it("Responds with the newly created appointment info", async () => {
    const mockResult = {
      title: "MockBook",
    };
    Library.makeAppointment = jest.fn().mockResolvedValue(mockResult);
    const response = await request(server())
      .post("/v1/borrow")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cover_edition_key: "COVEREDITION",
        pickup_in: "03-18-2023",
      });

    expect(Library.makeAppointment).toBeCalledTimes(1);
    expect(response.body.title).toEqual("MockBook");
  });
});
