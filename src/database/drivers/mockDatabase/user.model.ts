import { DatabaseDriver } from "../../base";
import { IUserTable } from "../../interfaces/userTable";

class MockUserDatabase {
  static mockUserTable: IUserTable[] = [
    {
      id: "0",
      name: "Rio",
    },
  ];

  findOneById(id: string) {
    return MockUserDatabase.mockUserTable.find((data) => data.id == id);
  }

  listAll() {
    return MockUserDatabase.mockUserTable;
  }

  addOne(newValue: Omit<IUserTable, "id">): IUserTable {
    const newData = {
      id: MockUserDatabase.mockUserTable.length.toString(),
      ...newValue,
    };
    MockUserDatabase.mockUserTable.push(newData);
    return newData;
  }
}

export class UserMockDBAdapter extends DatabaseDriver<IUserTable> {
  userModel: MockUserDatabase;
  constructor() {
    super();
    this.userModel = new MockUserDatabase();
  }

  async findAll(_where: {}): Promise<IUserTable[]> {
    const results = this.userModel.listAll();
    return results;
  }

  async addOne(newData: Omit<IUserTable, "id">): Promise<IUserTable> {
    const newUser = this.userModel.addOne(newData);
    return newUser;
  }
}
