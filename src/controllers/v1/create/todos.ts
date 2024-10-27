import express from "express";
// models
import { createTodoModel } from "../../../models/v1/todos";
// responseHandler
import { errorResponse, successResponse } from "../../../helpers/responseHandler";
import { HttpStatusCode } from "../../../helpers/httpStatusCodes";
// lib
import Joi from "joi";

export const createTodoController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.body) {
    return errorResponse(res, HttpStatusCode.BAD_REQUEST, "Missing required fields.", "MISSING_REQUIRED_FIELDS", {});
  }

  const { title, description } = req.body;

  try {
    const schema = Joi.object({
      title: Joi.string().trim().alphanum().min(3).max(30).required(),
      description: Joi.string().trim().allow(""),
    });

    const { error } = schema.validate({ title, description });

    if (error) {
      return errorResponse(res, HttpStatusCode.BAD_REQUEST, error.message, "MISSING_REQUIRED_FIELDS", error.details[0]);
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
