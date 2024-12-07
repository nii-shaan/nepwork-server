import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
    },
    email: String,
    password: String,
    refreshToken: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
