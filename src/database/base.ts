export class DatabaseDriver<Table> {
  async findAll(where?: {}): Promise<Table[]> {
    throw new Error("Not Implemented");
  }

  async findOne(where?: {}): Promise<Table | undefined> {
    throw new Error("Not Implemented");
  }

  async addOne(newData: Omit<Table, "id">): Promise<Table> {
    throw new Error("Not Implemented");
  }
}
