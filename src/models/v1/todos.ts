import express from "express";

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

export const getTodoByIdModel = async (req: express.Request, res: express.Response) => {
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
