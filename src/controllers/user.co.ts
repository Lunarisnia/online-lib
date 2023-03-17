import { UserTable } from "../services/database/interfaces/userTable";
import { Response, Request } from "express";
import { DatabaseDriver } from "../services/database/base";
import { UserMockDBAdapter } from "../services/database/drivers/mockDatabase/user.model";

export const getUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const users: DatabaseDriver<UserTable> = new UserMockDBAdapter();
  const userDatas: UserTable[] = await users.findAll();
  return res.send({ users: userDatas });
};

export const addUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: DatabaseDriver<UserTable> = new UserMockDBAdapter();
  const newUser = await users.addOne({ name: "string" });
  return res.send({ newUser: newUser });
};
