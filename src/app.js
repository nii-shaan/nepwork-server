import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/ApiError.js";

export const app = express();

/**
 * Basic middlewares
 */

//& TODO app.use(cors({}))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

/**
 *
*
*
*
*
*
** Routes
*/

//* User Route
import { userRoute } from "./routes/user.route.js";
app.use("/api/v1/user", userRoute);






//* Error handling 
app.use(errorHandler)