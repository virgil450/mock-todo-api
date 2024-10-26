import express from "express";

export const getAllTodos = async (
  req: express.Request,
  res: express.Response
): Promise<any[]> => {
  const pool = req.pool;

  const query = `SELECT * FROM todos`;
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
    return [];
  }
};
