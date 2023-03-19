import request from "supertest";
import { server } from "../../src/server";
import axios from "axios";
beforeEach(() => {
  jest.resetAllMocks();
});

describe("GET /v1/book/subject", () => {
  it("Responds with the list of books from the subject", async () => {
    const mockBooks = {
      work_count: 1,
      works: [
        {
          title: "MockBook",
        },
      ],
    };
    axios.get = jest.fn().mockResolvedValue({ data: mockBooks });
    const response = await request(server()).get("/v1/book/");

    expect(axios.get).toBeCalledTimes(1);
    expect(response.body.total_work).toEqual(1);
  });
});
