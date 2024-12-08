import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: true,
    },

    refreshToken: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
