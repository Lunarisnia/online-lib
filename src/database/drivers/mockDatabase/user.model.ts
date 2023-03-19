import { DatabaseDriver } from "../../base";
import { IUserTable } from "../../interfaces/userTable";

class MockUserDatabase {
  static mockUserTable: IUserTable[] = [
    {
      id: "0",
      username: "rio",
      password: "123",
      is_admin: false,
      name: "Rio",
    },
    {
      id: "1",
      username: "tania",
      password: "123",
      is_admin: false,
      name: "Tania",
    },
    {
      id: "2",
      username: "connor",
      password: "123",
      is_admin: false,
      name: "Connor",
    },
    {
      id: "3",
      username: "joey",
      password: "123",
      is_admin: true,
      name: "Connor",
    },
  ];

  public static findOne(query: (data: IUserTable) => unknown) {
    return MockUserDatabase.mockUserTable.find(query);
  }
}

export class UserMockDBAdapter extends DatabaseDriver<IUserTable> {
  private static userModel = MockUserDatabase;

  public static async findOne(
    where: (data: IUserTable) => unknown
  ): Promise<IUserTable | undefined> {
    const result = this.userModel.findOne(where);
    return result;
  }
}
