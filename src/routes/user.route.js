import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import {
  signup,
  login,
  requestOtp,
  verifyEmail,
  currentUserInfo,
} from "../controllers/index.js";

const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/request-otp", authenticate, requestOtp);
userRoute.post("/verify-email", authenticate, verifyEmail);
userRoute.get("/current-user-info", authenticate, currentUserInfo);

export { userRoute };
