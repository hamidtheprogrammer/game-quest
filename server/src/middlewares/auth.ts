import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../database/models/userModel";

interface decodedType extends JwtPayload {
  userId: string;
  username: string;
  isAdmin?: Boolean;
}

declare global {
  namespace Express {
    interface Request {
      user: decodedType;
    }
  }
}

const verifyToken = async (req: Request, res: Response) => {
  const key = process.env.SECRET_KEY as string;
  const token = req.cookies.jwt;
  console.log(key);

  if (!token) {
    return res.status(401).json({ auth: "Not authorized" });
  }

  try {
    const decoded: decodedType = jwt.verify(token, key) as decodedType;

    if (decoded) {
      const findUser = await userModel
        .findById(decoded.userId)
        .select("-password");

      if (findUser) {
        const user: decodedType = {
          userId: findUser._id as string,
          username: findUser.username,
          isAdmin: findUser.isAdmin,
        };
        res.status(200).json(user);
      } else {
        res.status(401).json({ auth: "user not found" });
      }
    } else {
      res.status(401).json({ auth: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = process.env.SECRET_KEY as string;
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ auth: "Not authorized" });
  }

  const decoded = jwt.verify(token, key) as decodedType;

  if (decoded) {
    const findUser = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (findUser) {
      const user: decodedType = {
        userId: findUser._id as string,
        username: findUser.username,
      };
      if (findUser.isAdmin) {
        user.isAdmin = findUser.isAdmin;
      }
      req.user = user;
      next();
    } else {
      res.status(401).json({ auth: "user not found" });
    }
  } else {
    res.status(401).json({ auth: "Not authorized" });
  }
};

export { verifyToken, authenticate };
