import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "./user.controller.js";

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!refreshToken) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          false,
          "Please provide Refresh Token to get new Access Token ",
        ),
      );
  }

  let userId;

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.AUTH_REFRESH_TOKEN_SECRET_KEY,
    );
    userId = decodedToken.id;
  } catch (error) {
    if (error.message == "jwt expired") {
      return res
        .status(401)
        .json(new ApiError(401, false, "Refresh token expired! Login again"));
    }
    return res.status(400).json(new ApiError(400, false, error.message));
  }

  const user = await User.findById(userId).select("name email");

  const newAccessToken = await generateAccessToken(userId);

  return res
    .status(200)
    .cookie("accessToken", newAccessToken)
    .json(
      new ApiResponse(200, true, true, "Access Token refreshed", {
        user,
        newAccessToken,
      }),
    );
});
export default refreshAccessToken;
