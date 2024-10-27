import express, { Router } from "express";
import { getAllTodosController, getTodosByIdController } from "../../controllers/v1/read/todos";

const router: Router = Router();

router.get("/todos", getAllTodosController);
router.get("/todos/:todoId", getTodosByIdController);



export default router;
