import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

userSchema.pre("save",function(){
  if(!this.isModified("password")) return next();
  
})

export const User = mongoose.model("User", userSchema);
