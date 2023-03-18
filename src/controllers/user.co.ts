import { IUserTable } from "../database/interfaces/userTable";
import { Response, Request } from "express";
import { DatabaseDriver } from "../database/base";
import { UserMockDBAdapter } from "../database/drivers/mockDatabase/user.model";

export const getUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const users: DatabaseDriver<IUserTable> = new UserMockDBAdapter();
  const userDatas: IUserTable[] = await users.findAll();
  return res.send({ users: userDatas });
};

export const addUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: DatabaseDriver<IUserTable> = new UserMockDBAdapter();
  const newUser = await users.addOne({ name: "string" });
  return res.send({ newUser: newUser });
};
