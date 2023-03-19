import { DatabaseDriver } from "../../base";
import { IBorrowingScheduleTable } from "../../interfaces/borrowingScheduleTable";

class MockBorrowingScheduleDatabase {
  static mockBorrowingScheduleTable: IBorrowingScheduleTable[] = [];

  public static findOne(query: (data: IBorrowingScheduleTable) => unknown) {
    return MockBorrowingScheduleDatabase.mockBorrowingScheduleTable.find(query);
  }

  public static listAll(
    query: (predicate: IBorrowingScheduleTable, index: number) => unknown
  ) {
    return MockBorrowingScheduleDatabase.mockBorrowingScheduleTable.filter(
      query
    );
  }

  public static addOne(
    newValue: Omit<IBorrowingScheduleTable, "id">
  ): IBorrowingScheduleTable {
    const newData = {
      id: MockBorrowingScheduleDatabase.mockBorrowingScheduleTable.length.toString(),
      ...newValue,
    };
    MockBorrowingScheduleDatabase.mockBorrowingScheduleTable.push(newData);
    return newData;
  }
}

export class BorrowingScheduleMockDBAdapter extends DatabaseDriver<IBorrowingScheduleTable> {
  private static borrowingScheduleModel = MockBorrowingScheduleDatabase;

  public static async findAll(
    where: (predicate: IBorrowingScheduleTable, index: number) => unknown
  ): Promise<IBorrowingScheduleTable[]> {
    const results = this.borrowingScheduleModel.listAll(where);
    return results;
  }

  public static async addOne(
    newData: Omit<IBorrowingScheduleTable, "id">
  ): Promise<IBorrowingScheduleTable> {
    const newUser = this.borrowingScheduleModel.addOne(newData);
    return newUser;
  }

  public static async findOne(
    where: (data: IBorrowingScheduleTable) => unknown
  ): Promise<IBorrowingScheduleTable | undefined> {
    return this.borrowingScheduleModel.findOne(where);
  }
}
