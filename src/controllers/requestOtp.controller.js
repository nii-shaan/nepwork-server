import asyncHandler from "../utils/asyncHandler.js";
import { Otp } from "../models/otp.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const requestOtp = asyncHandler(async (req, res) => {
  const email = req.body.email || "";
  email.trim();

  if (!email) {
    return res
      .status(406)
      .json(
        new ApiResponse(406, false, false, "email not provided for otp", null)
      );
  }

  const alreadyCreatedOtp = await Otp.findOne({ email });
  if (alreadyCreatedOtp) {
    return res
      .status(425)
      .json(
        new ApiResponse(
          425,
          false,
          true,
          "previous otp is not expired wait to expire before requesting again",
          null
        )
      );
  }

  const otp = await Otp.create({
    email,
    otpCode: Math.floor(Math.random() * 999999),
    expireAt: new Date(Date.now() + 305 * 1000),
  });

  // * deleting otp after n minutes
  setTimeout(async () => {
    await Otp.findOneAndDelete({ email });
  }, 300000);

  return res
    .status(200)
    .json(
      new ApiResponse(
        199,
        true,
        true,
        "otp created, will expire after 5 minute",
        otp
      )
    );
});
