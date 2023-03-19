import request from "supertest";
import { server } from "../../src/server";
import jwt from "jsonwebtoken";
import { serverConfig } from "../../src/config/components/server.config";
import { BorrowingScheduleMockDBAdapter } from "../../src/database/drivers/mockDatabase/borrowingSchedule.model";
import { Library } from "../../src/services/library/library";
import dayjs from "dayjs";
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
    expect(response.body.page_size).toEqual(10);
    expect(response.body.page_number).toEqual(1);
    expect(response.body.appointments).toHaveLength(1);
    expect(response.body.appointments[0].title).toEqual("MockBook");
  });

  it("Responds with only the second entry of the result", async () => {
    const mockResult = [
      {
        title: "MockBook",
      },
      {
        title: "MockBook2",
      },
    ];
    const db = BorrowingScheduleMockDBAdapter;

    db.findAll = jest.fn().mockImplementation((cb) => {
      cb({});
      return mockResult;
    });

    const response = await request(server())
      .get("/v1/borrow?page_number=2&page_size=1")
      .set("Authorization", `Bearer ${token}`);

    expect(db.findAll).toBeCalledTimes(1);
    expect(response.body.page_size).toEqual(1);
    expect(response.body.page_number).toEqual(2);
    expect(response.body.appointments).toHaveLength(1);
    expect(response.body.appointments[0].title).toEqual("MockBook2");
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
        pickup_in: dayjs().add(1, "hour").toISOString(),
      });

    expect(Library.makeAppointment).toBeCalledTimes(1);
    expect(response.body.title).toEqual("MockBook");
  });
});
