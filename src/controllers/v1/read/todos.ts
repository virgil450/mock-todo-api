import express from "express";
import { getAllTodos } from "../../../models/v1/todos";

export const getTodosReadController = async (req: express.Request, res: express.Response) => {

  const todos = await getAllTodos(req, res);

  if (!todos) {
    res.status(500).send("Internal server error");
  }

  if (todos.length === 0) {
    res.status(404).send("No todos found");
  }

  if (todos) {
    res.send(todos);
  }

};
