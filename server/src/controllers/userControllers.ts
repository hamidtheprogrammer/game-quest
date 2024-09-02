import { userModel } from "../database/models/userModel";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import createToken from "../utils/generateToken";

const registerUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const userExists = await userModel.findOne({ email: user.email });
    if (userExists) {
      return res.status(400).json({ email: "email already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newuser = await new userModel({
      email: user.email,
      password: hashedPassword,
      username: user.username,
    }).save();

    if (newuser) {
      createToken({ res, userId: newuser._id as string });
      res.status(200).json({ newuser });
    } else {
      res
        .status(500)
        .send("An unexpected server error occured. Please try again");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ password: "incorrect password" });
      }
      createToken({ res, userId: user._id as string });
      res.status(200).json({
        userId: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).json({ email: "email not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    const profile = await userModel
      .findById(req.user.userId as string)
      .select("-password");
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(401).json({ profile: "Could not get profile" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateCurrentUserProfile = async (req: Request, res: Response) => {
  const newProfile = req.body;

  if (newProfile.password) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newProfile.password, salt);

    newProfile.password = hashedPassword;
  }
  try {
    const updatedProfile = await userModel
      .findByIdAndUpdate(req.user.userId, newProfile, { new: true })
      .select("-password");
    if (updatedProfile) {
      res.status(200).json(updatedProfile);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    await userModel.findByIdAndDelete(req.user.userId as string);

    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    maxAge: 0, // Immediately expire the cookie
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
  });

  res.status(200).json({ message: "Logout successful" });
};

export {
  registerUser,
  loginUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUserProfile,
  logout,
};
