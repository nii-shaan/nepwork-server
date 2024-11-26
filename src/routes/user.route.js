import express from "express";
import { Router } from "express";
import { test } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get("/signup", test);


export { userRoute };
