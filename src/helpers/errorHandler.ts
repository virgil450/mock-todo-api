// errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "./responseHandler";
import { HttpStatusCode } from "./httpStatusCodes";

interface CustomError extends Error {
  status?: HttpStatusCode;
  code?: string;
  details?: any;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || "An unexpected error occurred.";
  const code = err.code || "UNKNOWN_ERROR";
  const details = err.details || null;

  errorResponse(res, status, message, code, details);
};

export default errorHandler;
