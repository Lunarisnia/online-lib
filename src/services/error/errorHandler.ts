"use strict";
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

  console.log(err);

  switch (name) {
    case "TokenExpiredError":
      return res.status(401).json(errorFormatter(1007, name, message));
    case "ValidationError":
      return res
        .status(400)
        .json(errorFormatter(1008, name, err.details[0].message));
    case "JsonWebTokenError":
      return res.status(401).json(errorFormatter(1009, name, message));
    case "MulterError":
      return res
        .status(400)
        .json(errorFormatter(1010, name, "File is too big."));
    default:
      return res
        .status(statusCode || 500)
        .json(
          errorFormatter(
            errId || 1001,
            "InternalError",
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
