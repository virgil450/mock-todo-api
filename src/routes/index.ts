import { Router } from "express";
const router = Router();

// routes
import todos from "./v1/todos";

router.use(todos);

export default router;
