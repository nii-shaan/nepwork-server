import asyncHandler from "../utils/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  console.log("hello from authenticate middleware");
  next();
});

export default authenticate;
