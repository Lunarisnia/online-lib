export class DatabaseDriver<Table> {
  async findAll(where?: {}): Promise<Table[]> {
    return [];
  }

  async findOne(where?: {}): Promise<Table | undefined> {
    return;
  }

  async addOne(newData: Omit<Table, "id">): Promise<Table> {
    throw new Error("Not Implemented");
  }
}
