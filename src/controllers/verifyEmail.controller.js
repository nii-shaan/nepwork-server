import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const verifyEmail = asyncHandler(async (req, res) => {
  const data = req.body;
  const email = data.email || "";
  let otpCode = data.otpCode || Number();
  email.trim();

  otpCode = Number(otpCode);

  if (!email) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          false,
          true,
          "Email is required for email verification",
          null
        )
      );
  }

  const otp = await Otp.findOne({ email });

  if (!otp) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          false,
          true,
          "OTP expired or has not been requested, try again",
          null
        )
      );
  }

  if (otpCode !== otp.otpCode) {
    return res
      .status(400)
      .json(new ApiResponse(400, false, true, "Invalid OTP", null));
  }

  const user = await User.findOneAndUpdate({ email }, { emailVerified: true });

  if (!user) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          false,
          true,
          "Something went wrong! Try again",
          null
        )
      );
  }

  if (user.emailVerified) {
    return res
      .status(400)
      .json(new ApiResponse(400, false, true, "Email already verified", null));
  }
  return res.status(200).json(
    new ApiResponse(200, true, true, "Email verified successfully", {
      email,
    })
  );
});
