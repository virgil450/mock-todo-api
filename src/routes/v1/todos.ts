import express, { Router } from "express";
import { getTodosReadController } from "../../controllers/v1/read/todos";

const router: Router = Router();

router.get("/todos", getTodosReadController);

export default router;
