import { request, response } from "express";
import { createBorrowSchedule } from "../../src/controllers/borrow.co";
import { Library } from "../../src/services/library/library";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a request to make an appointment", () => {
  it("Return the newly created appointment successfully", async () => {
    const mockReturn = 1;

    Library.makeAppointment = jest.fn().mockReturnValue(mockReturn);
    request.body = {
        title: "Test",
        authors: [
            {
                key: "key",
                name: "Author"
            }
        ],
        cover_edition_key: "key",
        pickup_in: "2021-12-01"
    }
    response.send = jest.fn().mockReturnValue(mockReturn);
    const result = await createBorrowSchedule(request, response);

    expect(result).toEqual(1);
  });
});
