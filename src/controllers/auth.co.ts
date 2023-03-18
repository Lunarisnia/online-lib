import { Response, Request, NextFunction } from "express";
import { Authenticator } from "../services/auth/auth";
import { schemaValidation } from "../services/request/schemaValidation";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config/components/server.config";
import { UnauthorizedAccessError } from "../services/error/types";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

export const login = async (req: Request, res: Response): Promise<Response> => {
  schemaValidation(loginSchema, req.body, { allowUnknown: false });
  const token = await Authenticator.authenticate(
    req.body.username,
    req.body.password
  );
  return res.send({
    token: token,
  });
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  res.locals.user = jwt.verify(token || "", serverConfig.jwtSecret);
  next();
};

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  res.locals.user = jwt.verify(token || "", serverConfig.jwtSecret);
  if (!res.locals.user.is_admin)
    throw new UnauthorizedAccessError("Unauthorized Access");
  else next();
};
