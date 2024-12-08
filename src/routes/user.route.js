import { Router } from "express";
import {
  signup,
  login,
  requestOtp,
  verifyEmail,
} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.get("/login", login);
userRoute.post("/requestOtp",requestOtp);

export { userRoute };
