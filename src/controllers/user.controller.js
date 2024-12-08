import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";

export const signup = asyncHandler(async (req, res) => {
  const data = req.body;

  const firstName = data.name.firstName || "";
  firstName.trim();

  const lastName = data.name.lastName || "";
  lastName.trim();
  const email = data.email || "";
  email.trim();
  const password = data.password || "";

  console.log(data);

  if (!firstName) {
    return res
      .status(406)
      .json(new ApiResponse(406, false, false, "first name is required", null));
  }

  if (!lastName) {
    return res
      .status(406)
      .json(new ApiResponse(406, false, false, "last name is required", null));
  }

  if (!password) {
    return res
      .status(406)
      .json(new ApiResponse(406, false, false, "password is required", null));
  }
  if (password.length < 8) {
    return res
      .status(406)
      .json(new ApiResponse(406, false, false, "password too short", null));
  }
  if (!email) {
    return res
      .status(406)
      .json(new ApiResponse(406, false, false, "email is required", null));
  }

  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return res
      .status(406)
      .json(
        new ApiResponse(
          406,
          false,
          false,
          "user with this email already exists",
          null
        )
      );
  }

  const user = await User.create({
    name: { firstName, middleName: "", lastName },
    password,
    email,
  });

  if (user) {
    return res.status(201).json(
      new ApiResponse(201, true, false, "user created", {
        name: user.name,
        email: user.email,
      })
    );
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, false, false, "something went wrong", null));
  }
});

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

export const verifyEmail = asyncHandler(async (req, res) => {
  const data = req.body;
  const email = data.email || "";
  let otpCode = data.otpCode || Number();
  email.trim();

  otpCode = Number(otpCode);

  if (!email) {
    return res
      .status(406)
      .json(
        new ApiResponse(
          406,
          false,
          true,
          "email is required for email verification",
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
          "otp has expired or is not request, try again",
          null
        )
      );
  }

  if (otpCode !== otp.otpCode) {
    return res
      .status(406)
      .json(new ApiResponse(406, false, true, "invalid otp", null));
  }

  const user = await User.findOneAndUpdate({ email }, { emailVerified: true });

  if (!user) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, true, "something went wrong", null));
  }

  if (user.emailVerified) {
    return res
      .status(400)
      .json(new ApiResponse(400, false, true, "email already verified", null));
  }
  return res.status(200).json(
    new ApiResponse(200, true, true, "email verified successfully", {
      email,
    })
  );
});





export const login = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, true, false, "this is login endpoint", null));
});
