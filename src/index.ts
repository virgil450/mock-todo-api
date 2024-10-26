import express from "express";
import cors from "cors";
import pool from "./config/db";
import { Pool } from "pg";

const app = express();
const port = process.env.PORT || 3060;

import routes from "./routes/index";

// connect to database
pool.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected to database");
  }
});

app.use(
  cors({
    origin: "*",
  })
);

// extend request with pg pool
declare global {
  namespace Express {
    interface Request {
      pool: Pool;
    }
  }
}

// Inject services into requests
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.pool = pool;
    next();
  }
);

app.options("*", cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/v1/", routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
