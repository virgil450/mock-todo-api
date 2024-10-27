import express from "express";
import { getAllTodosModel, getTodoByIdModel } from "../../../models/v1/todos";
import { errorResponse, successResponse } from "../../../helpers/responseHandler";
import { HttpStatusCode } from "../../../helpers/httpStatusCodes";

export const getAllTodosController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const todos = await getAllTodosModel(req, res);

    if (todos.length === 0) {
      return successResponse(res, HttpStatusCode.NO_CONTENT, "No todos found.", null);
    }

    return successResponse(res, HttpStatusCode.OK, "Todos fetched successfully.", todos);
  } catch (err) {
    next(err);
  }
};

export const getTodosByIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { todoId } = req.params;
  try {
    const todo = await getTodoByIdModel(req, res);

    if (!todo.length) {
      return successResponse(res, HttpStatusCode.NO_CONTENT, "No todo found.", {});
    }

    return successResponse(res, HttpStatusCode.OK, "Todo fetched successfully.", todo);
  } catch (err) {
    console.error("Error fetching todo:", err);
    next(err);
  }
};
