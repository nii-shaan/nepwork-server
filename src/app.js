import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

/**
 * Basic middlewares
 */

//& TODO app.use(cors({}))

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());