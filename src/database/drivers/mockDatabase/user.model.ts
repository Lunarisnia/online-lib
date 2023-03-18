import { DatabaseDriver } from "../../base";
import { IUserTable } from "../../interfaces/userTable";

class MockUserDatabase {
  static mockUserTable: IUserTable[] = [
    {
      id: "0",
      username: "rio",
      password: "123",
      name: "Rio",
    },
    {
      id: "1",
      username: "tania",
      password: "123",
      name: "Tania",
    },
    {
      id: "2",
      username: "connor",
      password: "123",
      name: "Connor",
    },
  ];

  findOne(query: (data: IUserTable) => unknown) {
    return MockUserDatabase.mockUserTable.find(query);
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
  private userModel: MockUserDatabase;
  constructor() {
    super();
    this.userModel = new MockUserDatabase();
  }

  async findOne(
    where: (data: IUserTable) => unknown
  ): Promise<IUserTable | undefined> {
    const result = this.userModel.findOne(where);
    return result;
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
