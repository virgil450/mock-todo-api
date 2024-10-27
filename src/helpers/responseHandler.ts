// responseHandler.ts

import { Response } from "express";
import { HttpStatusCode } from "./httpStatusCodes";

// Define types for success and error responses
interface SuccessResponse<T = undefined> {
  status: number;
  status_text: string;
  message: string;
  data?: T;
  timestamp: string;
}

interface ErrorDetails {
  code: string;
  details?: any;
}

interface ErrorResponse {
  status: number;
  status_text: string;
  message: string;
  timestamp: string;
  error: ErrorDetails;
}

// Generic response function to centralize logic
const generateResponse = <T>(
  res: Response,
  status: number,
  statusText: string,
  message: string,
  data?: T,
  errorDetails?: ErrorDetails
): void => {
  const timestamp = new Date().toISOString();

  const response = {
    status,
    status_text: statusText,
    message,
    timestamp,
    ...(data !== undefined ? { data } : {}),
    ...(errorDetails ? { error: errorDetails } : {}),
  };
  console.log(response)
  res.status(status).json(response);
};

// Success response function
export const successResponse = <T>(
  res: Response,
  status: HttpStatusCode = HttpStatusCode.OK,
  message = "Success",
  data?: T
): void => {
  generateResponse(res, status, "Success", message, data);
};

// Error response function
export const errorResponse = (
  res: Response,
  status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
  message = "An unexpected error occurred.",
  code = "UNKNOWN_ERROR",
  details: any = null
): void => {
  const errorDetails: ErrorDetails = { code, details };
  generateResponse(res, status, "Error", message, undefined, errorDetails);
};
