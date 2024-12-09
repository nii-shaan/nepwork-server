import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import {
  signup,
  login,
  requestOtp,
  verifyEmail,
} from "../controllers/index.js";

const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.get("/login", login);
userRoute.post("/requestOtp", authenticate, requestOtp);
userRoute.post("/verifyEmail", authenticate, verifyEmail);

export { userRoute };
