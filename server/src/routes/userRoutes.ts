import { Router } from "express";
import {
  deleteCurrentUserProfile,
  getCurrentUserProfile,
  loginUser,
  logout,
  registerUser,
  updateCurrentUserProfile,
} from "../controllers/userControllers";
import { validate, validationRules } from "../middlewares/validateUser";
import { authenticate, verifyToken } from "../middlewares/auth";

const userRouter = Router();

userRouter.route("/register").post(validationRules({}), validate, registerUser);
userRouter
  .route("/login")
  .post(validationRules({ login: true }), validate, loginUser);
userRouter.route("/verify-token").get(verifyToken);
userRouter.route("/get-profile").get(authenticate, getCurrentUserProfile);
userRouter
  .route("/update-profile")
  .post(
    authenticate,
    validationRules({ updateProfile: true }),
    validate,
    updateCurrentUserProfile
  );
userRouter.route("/delete-profile").get(authenticate, deleteCurrentUserProfile);
userRouter.route("/logout").post(logout);

export default userRouter;
