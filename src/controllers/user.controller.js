import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const signup = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, true, false, "this is singup endpoint", null));
});

export const login = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, true, false, "this is login endpoint", null));
});
