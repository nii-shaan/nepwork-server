import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otpCode: Number,
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpSchema);
