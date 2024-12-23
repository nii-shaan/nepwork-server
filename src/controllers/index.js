import { login, signup } from "./user.controller.js";
import refreshAccessToken from "./refreshAccessToken.controller.js";
import { requestOtp } from "./requestOtp.controller.js";
import { verifyEmail } from "./verifyEmail.controller.js";
import { verifyToken } from "./verifyToken.controller.js";
import { currentUserInfo } from "./currentUserInfo.controller.js";

export {
  login,
  signup,
  refreshAccessToken,
  requestOtp,
  verifyEmail,
  verifyToken,
  currentUserInfo,
};
