import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const currentUserInfo = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, true, true, "Hello test passed", req.user));
});
