import { IUserTable } from "../../database/interfaces/userTable";
import { UserMockDBAdapter } from "../../database/drivers/mockDatabase/user.model";
import { UnauthorizedAccessError } from "../error/types";
import jwt from "jsonwebtoken";
import { serverConfig } from "../../config/components/server.config";

export class Authenticator {
  private static userModel = new UserMockDBAdapter();

  private static validatePassword(
    password: string,
    actualPassword: string
  ): boolean {
    return password == actualPassword;
  }

  public static async authenticate(
    username: string,
    password: string
  ): Promise<string> {
    const query = (data: IUserTable) => {
      return data.username == username;
    };
    const user = await this.userModel.findOne(query);
    if (!user) throw new UnauthorizedAccessError("Unauthorized Access");
    if (!this.validatePassword(password, user.password))
      throw new UnauthorizedAccessError("Unauthorized Access");

    return jwt.sign(
      {
        user_id: user.id,
        is_admin: user.is_admin,
      },
      serverConfig.jwtSecret,
      {
        expiresIn: serverConfig.jwtExpDay,
      }
    );
  }
}
