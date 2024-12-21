import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const verifyToken = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(200).json(
    new ApiResponse(200, true, true, "Token verified", {
      name: user.name,
      email: user.email,
    }),
  );
});
