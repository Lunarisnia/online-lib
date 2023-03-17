import { DatabaseDriver } from "../../base";
import { UserTable } from "../../interfaces/userTable";

class MockUserDatabase {
  static mockUserTable: UserTable[] = [
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

  addOne(newValue: Omit<UserTable, "id">): UserTable {
    const newData = {
      id: MockUserDatabase.mockUserTable.length.toString(),
      ...newValue,
    };
    MockUserDatabase.mockUserTable.push(newData);
    return newData;
  }
}

export class UserMockDBAdapter extends DatabaseDriver<UserTable> {
  userModel: MockUserDatabase;
  constructor() {
    super();
    this.userModel = new MockUserDatabase();
  }

  async findAll(_where: {}): Promise<UserTable[]> {
    const results = this.userModel.listAll();
    return results;
  }

  async addOne(newData: Omit<UserTable, "id">): Promise<UserTable> {
    const newUser = this.userModel.addOne(newData);
    return newUser;
  }
}
