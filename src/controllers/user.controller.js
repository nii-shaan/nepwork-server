import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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




export const login = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, true, false, "this is login endpoint", null));
});
