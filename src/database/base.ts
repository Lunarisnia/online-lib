export class DatabaseDriver<Table> {
  async findAll(where?: {}): Promise<Table[]> {
    return [];
  }

  async addOne(newData: Omit<Table, "id">): Promise<Table> {
    throw new Error("Not Implemented");
  }
}
