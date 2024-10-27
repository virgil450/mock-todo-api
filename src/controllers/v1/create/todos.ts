import express from "express";
import { createTodoModel } from "../../../models/v1/todos";
import { errorResponse, successResponse } from "../../../helpers/responseHandler";
import { HttpStatusCode } from "../../../helpers/httpStatusCodes";

export const createTodoController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.body) {
    return errorResponse(res, HttpStatusCode.BAD_REQUEST, "Missing required fields.");
  }

  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return errorResponse(res, HttpStatusCode.BAD_REQUEST, "Missing required fields.");
    }

    const todo = await createTodoModel(req, res);

    if (!todo.length) {
      return successResponse(res, HttpStatusCode.NO_CONTENT, "No todo created.", {});
    }

    return successResponse(res, HttpStatusCode.CREATED, "Todo created successfully.", { todoId: todo[0].id });
  } catch (err) {
    next(err);
  }
};
