"use strict";
import { serverConfig } from "../../config/components/server.config";
import { Request, Response, NextFunction } from "express";

/**
 * Main error handling middleware.
 */
export const errHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { name, message, statusCode, errId } = err;

  if (!serverConfig.isTest) console.error(err);

  switch (name) {
    case "TokenExpiredError":
      return res.status(401).json(errorFormatter(1006, name, message));
    case "ValidationError":
      return res
        .status(400)
        .json(errorFormatter(1007, name, err.details[0].message));
    case "JsonWebTokenError":
      return res.status(401).json(errorFormatter(1008, name, message));
    default:
      return res
        .status(statusCode || 500)
        .json(
          errorFormatter(
            errId || 1001,
            name || "InternalError",
            message || "Internal Server Error"
          )
        );
  }
};

const errorFormatter = (id: number, name: string, message: string) => ({
  error: { id, name, message },
});

/**
 * Wrapping function to automatically catch errors.
 * @param fn Controller Functions
 */
export const wrap =
  (fn: any) =>
  (...args: any) => {
    fn(...args).catch((err: any) => {
      args[2](err);
    });
  };
