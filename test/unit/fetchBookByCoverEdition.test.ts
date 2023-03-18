import axios from "axios";
import { ResourceNotFoundError } from "../../src/services/error/types";
import { Library } from "../../src/services/library/library";
beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a request to fetch book by its cover edition", () => {
  it("Successfully return the book detail", async () => {
    const mockResult = {};
    axios.get = jest.fn().mockResolvedValue({ data: mockResult });
    await Library.fetchBookByCoverEdition("COVEREDITION");
  });

  it("Threw an error because the book is not found", async () => {
    const mockResult = {
      response: {
        data: {
          error: "notfound",
        },
      },
    };
    axios.get = jest.fn().mockRejectedValue(mockResult);
    const request = Library.fetchBookByCoverEdition("INVALIDEDITION");

    expect(request).rejects.toThrow(ResourceNotFoundError);
  });

  it("Threw an error because other reasons", async () => {
    axios.get = jest.fn().mockRejectedValue(Error("Error"));
    const request = Library.fetchBookByCoverEdition("INVALIDEDITION");

    expect(request).rejects.toThrow(Error);
  });
});
