import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!accessToken) {
    return res.status(401).json(new ApiError(400, "Access Token not provided"));
  }

  try {
    const jwtVerification = jwt.verify(
      accessToken,
      process.env.AUTH_ACCESS_TOKEN_SECRET_KEY
    );

    const user = await User.findById(jwtVerification.id).select("-password");
    req.user = user;

    next();
  } catch (e) {
    return res.status(401).json(new ApiError(401, "Invalid Access Token"));
  }
});

export default authenticate;
