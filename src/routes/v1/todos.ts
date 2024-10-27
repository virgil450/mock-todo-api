import express, { Router } from "express";
import { getAllTodosController, getTodosByIdController } from "../../controllers/v1/read/todos";
import { createTodoController } from "../../controllers/v1/create/todos";

const router: Router = Router();

router.get("/todos", getAllTodosController);
router.get("/todos/:todoId", getTodosByIdController);

router.post("/todos", createTodoController);


export default router;
