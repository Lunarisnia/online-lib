"use strict";

class CustomError extends Error {
  protected _statusCode: number;
  protected _errId: number;

  get statusCode(): number {
    return this._statusCode;
  }

  get errId(): number {
    return this._statusCode;
  }

  constructor(message: string) {
    super(message);
    this._statusCode = 0;
    this._errId = 0;
  }
}

export class InternalError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "InternalError";
    this._statusCode = 500;
    this._errId = 1001;
  }
}

export class JsonWebTokenError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "JsonWebTokenError";
    this._statusCode = 401;
    this._errId = 1002;
  }
}

export class InvalidCredentialError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialError";
    this._statusCode = 400;
    this._errId = 1003;
  }
}

export class ResourceNotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
    this._statusCode = 404;
    this._errId = 1004;
  }
}

export class ForbiddenAccessError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenAccessError";
    this._statusCode = 403;
    this._errId = 1005;
  }
}

export class UnauthorizedAccessError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedAccessError";
    this._statusCode = 401;
    this._errId = 1006;
  }
}
