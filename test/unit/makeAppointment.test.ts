import axios from "axios";
import dayjs from "dayjs";
import {
  BookUnavailableError,
  DayUnavailableError,
} from "../../src/services/error/types";
import { Library } from "../../src/services/library/library";
import { BorrowingScheduleMockDBAdapter } from "../../src/database/drivers/mockDatabase/borrowingSchedule.model";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a request to make an appointment", () => {
  it("Return the newly created appointment successfully", async () => {
    const mockBooks = { title: "Foo", authors: [{ key: "Foo/key" }] };
    axios.get = jest.fn().mockResolvedValue({ data: mockBooks });
    const newAppointment = await Library.makeAppointment(
      dayjs().format(),
      "2123",
      "0"
    );

    expect(axios.get).toBeCalledTimes(1);
    expect(newAppointment.title).toEqual("Foo");
  });

  it("Rejects the request because the date is < today", async () => {
    const newAppointment = Library.makeAppointment(
      dayjs().subtract(1, "day").format(),
      "2123",
      "0"
    );

    expect(newAppointment).rejects.toThrow(DayUnavailableError);
  });

  it("Rejects the request because there is already too many people booking the same day", async () => {
    const db = BorrowingScheduleMockDBAdapter;

    const today = dayjs().format();
    const mockSchedules = [
      { user_id: "1", pickup_in: dayjs().subtract(1, "day").format() },
      { user_id: "1", pickup_in: today },
      { user_id: "1", pickup_in: today },
      { user_id: "1", pickup_in: today },
      { user_id: "2", pickup_in: today },
    ];
    db.findAll = jest.fn().mockResolvedValue(mockSchedules);
    const newAppointment = Library.makeAppointment(today, "2123", "0");

    expect(newAppointment).rejects.toThrow(DayUnavailableError);
  });

  it("Rejects the request because the book has already borrowed", async () => {
    const db = BorrowingScheduleMockDBAdapter;

    const today = dayjs().format();
    const mockSchedules = [{ user_id: "0", pickup_in: today }];
    db.findAll = jest.fn().mockImplementation((cb) => {
      cb(mockSchedules);
      return mockSchedules;
    });
    db.findOne = jest.fn().mockImplementation((cb) => {
      cb({});
      return {};
    });

    const newAppointment = Library.makeAppointment(today, "2123", "0");

    expect(newAppointment).rejects.toThrow(BookUnavailableError);
  });
});
