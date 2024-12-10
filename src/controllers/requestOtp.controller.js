import asyncHandler from "../utils/asyncHandler.js";
import { Otp } from "../models/otp.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { MailService } from "../utils/MailHandler.js";

export const requestOtp = asyncHandler(async (req, res) => {
  const email = req.body.email || "";
  email.trim();

  if (!email) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, false, false, "Email not provided for otp", null)
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
          "Previous otp is not expired wait to expire before requesting again",
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

  const mailed = await MailService.otpMail(email, otp.otpCode);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        true,
        true,
        "OTP for Email verification was sent",
        mailed.response
      )
    );
});
