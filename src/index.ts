import express, { Router } from "express";
import cors from "cors";
// database
import pool from "./config/db";
import { Pool } from "pg";
// routes
import routes from "./routes/index";
import errorHandler from "./helpers/errorHandler";
// body parser
import bodyParser from "body-parser";
// rate limiter
import rateLimit from 'express-rate-limit';
// logger
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3080;
const router = Router();

// connect to database
pool.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected to database");
  }
});


const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 150, // limit each IP to 150 requests per windowMs
});

// Apply the rate limiting middleware
app.use(limiter);

// Logger
app.use(morgan('dev'));

// Middleware to parse JSON
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  }),
);

// extend request with pg pool
declare global {
  namespace Express {
    interface Request {
      pool: Pool;
    }
  }
}
app.options("*", cors());

// Inject db pool into requests
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.pool = pool;
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Routes
app.use("/v1/", routes);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
