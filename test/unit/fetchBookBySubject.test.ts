import axios from "axios";
import { Library } from "../../src/services/library/library";
beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a request to fetch books by its subject", () => {
  it("Successfully return the list of books", async () => {
    const mockResult : any[] = [];
    axios.get = jest.fn().mockResolvedValue({ data: mockResult });
    await Library.fetchBooksBySubject("horror");
  });
});
