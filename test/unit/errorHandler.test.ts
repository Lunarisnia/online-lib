import { NextFunction, request, Request, response, Response } from "express";
import { wrap } from "../../src/services/error/errorHandler";
import {
  InternalError,
  UnauthorizedAccessError,
} from "../../src/services/error/types";
beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a function that help wrap and handle error", () => {
  it("Caught the InternalError error successfully", () => {
    const mockFunction = jest.fn(() => {
      throw new InternalError("Internal Server Error");
    });

    const f = (req: Request, res: Response, next: NextFunction) => {
      wrap(mockFunction)(req, res, next);
    };

    const result = async () => f(request, response, () => {});
    expect(result).rejects.toThrow(InternalError);
  });

  it("Caught the UnauthorizedAccessError error successfully", () => {
    const err = new UnauthorizedAccessError("Unauthorized");
    const mockFunction = jest.fn(() => {
      throw err;
    });

    const f = (req: Request, res: Response, next: NextFunction) => {
      wrap(mockFunction)(req, res, next);
    };

    const result = async () => f(request, response, () => {});
    expect(result).rejects.toThrow(UnauthorizedAccessError);
    expect(err.errId).toEqual(1003);
    expect(err.statusCode).toEqual(401);
  });
});
