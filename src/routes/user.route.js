import { Router } from "express";
import { signup,login } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get("/signup", signup);
userRoute.get("/login",login)

export { userRoute };
