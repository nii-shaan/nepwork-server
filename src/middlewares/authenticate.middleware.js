import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!accessToken) {
    return res
      .status(401)
      .json(new ApiError(400, false, "Access Token not provided"));
  }

  try {
    // * If token valid goto next middleware
    const jwtVerification = jwt.verify(
      accessToken,
      process.env.AUTH_ACCESS_TOKEN_SECRET_KEY,
    );

    const user = await User.findById(jwtVerification.id).select("-password");
    req.user = user;

    next();
  } catch (e) {
    // * If invalid token return response
    if (e.message == "jwt expired") {
      return res
        .status(400)
        .json(new ApiError(400, false, "Access Token Expired"));
    }
    return res
      .status(401)
      .json(new ApiError(401, false, "Invalid Access Token"));
  }
});

export default authenticate;
