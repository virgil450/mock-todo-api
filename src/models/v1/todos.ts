import express from "express";
import { v4 as uuidv4 } from "uuid";

export const getAllTodosModel = async (req: express.Request, res: express.Response): Promise<any[]> => {
  const pool = req.pool;

  const query = `SELECT * FROM todos`;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getTodoByIdModel = async (req: express.Request, res: express.Response): Promise<any[]> => {
  const pool = req.pool;
  const { todoId } = req.params;
  const query = `SELECT * FROM todos WHERE id = $1`;
  try {
    const result = await pool.query(query, [todoId]);
    return result.rows;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createTodoModel = async (req: express.Request, res: express.Response): Promise<any[]> => {
  const pool = req.pool;

  const { title, description, due_date, is_completed, priority} = req.body;
  const query = `INSERT INTO todos (title, description, due_date, is_completed, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  try {
    const result = await pool.query(query, [title, description, due_date, is_completed, priority]);
    console.log(result);
    return result.rows;
  } catch (err) {
    console.error(err);
    return [];
  }
};
