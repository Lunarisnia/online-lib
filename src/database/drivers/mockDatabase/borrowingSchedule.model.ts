import { DatabaseDriver } from "../../base";
import { IBorrowingScheduleTable } from "../../interfaces/borrowingScheduleTable";

class MockBorrowingScheduleDatabase {
  static mockBorrowingScheduleTable: IBorrowingScheduleTable[] = [];

  findOne(query: (data: IBorrowingScheduleTable) => unknown) {
    return MockBorrowingScheduleDatabase.mockBorrowingScheduleTable.find(query);
  }

  listAll(
    query: (predicate: IBorrowingScheduleTable, index: number) => unknown
  ) {
    return MockBorrowingScheduleDatabase.mockBorrowingScheduleTable.filter(
      query
    );
  }

  addOne(
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
  borrowingScheduleModel: MockBorrowingScheduleDatabase;
  constructor() {
    super();
    this.borrowingScheduleModel = new MockBorrowingScheduleDatabase();
  }

  async findAll(
    where: (predicate: IBorrowingScheduleTable, index: number) => unknown
  ): Promise<IBorrowingScheduleTable[]> {
    const results = this.borrowingScheduleModel.listAll(where);
    return results;
  }

  async addOne(
    newData: Omit<IBorrowingScheduleTable, "id">
  ): Promise<IBorrowingScheduleTable> {
    const newUser = this.borrowingScheduleModel.addOne(newData);
    return newUser;
  }

  async findOne(
    where: (data: IBorrowingScheduleTable) => unknown
  ): Promise<IBorrowingScheduleTable | undefined> {
    return this.borrowingScheduleModel.findOne(where);
  }
}
