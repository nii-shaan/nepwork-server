import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import {
  signup,
  login,
  refreshAccessToken,
  requestOtp,
  verifyEmail,
  verifyToken,
  currentUserInfo,
} from "../controllers/index.js";

const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/refresh-access-token", refreshAccessToken);
userRoute.post("/request-otp", authenticate, requestOtp);
userRoute.post("/verify-email", authenticate, verifyEmail);
userRoute.get("/verify-token", authenticate, verifyToken);
userRoute.get("/current-user-info", authenticate, currentUserInfo);

export { userRoute };
