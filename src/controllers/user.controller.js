import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { MailService } from "../utils/MailHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const generateAccessToken = async function (id) {
  const user = await User.findById(id);

  return jwt.sign(
    {
      id: user._id,
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      email: user.email,
    },
    process.env.AUTH_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
  );
};

const generateRefreshToken = async function (id) {
  const user = await User.findById(id);
  return jwt.sign(
    {
      id: user._id,
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      email: user.email,
    },
    process.env.AUTH_REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY }
  );
};

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
      .status(400)
      .json(new ApiError(400, false, "First name is required"));
  }

  if (!lastName) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Last name is required"));
  }

  if (!password) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Password is required", null));
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Password too short", null));
  }
  if (!email) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Email is required", null));
  }

  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return res
      .status(400)
      .json(new ApiError(400, false, "User with this email already exists"));
  }

  const user = await User.create({
    name: { firstName, middleName: "", lastName },
    password,
    email,
  });

  if (user) {
    // * Successfully created user and sending welcome mail
    MailService.welcomeMail(
      user.email,
      user.name.firstName,
      user.name.lastName
    );

    return res.status(201).json(
      new ApiResponse(201, true, false, "User created", {
        name: user.name,
        email: user.email,
      })
    );
  } else {
    return res
      .status(500)
      .json(new ApiError(500, false, "Something went wrong"));
  }
});

export const login = asyncHandler(async (req, res) => {
  const data = req.body;
  const email = data.email || "";
  email.trim();
  const password = data.password || "";
  password.trim();

  if (!email) {
    return res.status(400).json(new ApiError(400, false, "Email is required"));
  }

  if (!password) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Password is required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiError(404, false, "User not found"));
  }

  if (password !== user.password) {
    return res.status(400).json(new ApiError(400, false, "Incorrect Password"));
  }

  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  user.save();

  return res
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .status(200)
    .json(
      new ApiResponse(200, true, true, "Login successful", {
        name: user.name,
        email: user.email,
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      })
    );
});
