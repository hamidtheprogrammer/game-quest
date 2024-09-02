import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

interface validationRulesOptions {
  login?: Boolean;
  updateProfile?: Boolean;
}

const validationRules = ({ login, updateProfile }: validationRulesOptions) => {
  if (login) {
    return [
      body("email").isEmail().withMessage("Invalid email"),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must have minimum of 8 characters"),
    ];
  }
  if (updateProfile) {
    return [
      body("email").optional().isEmail().withMessage("Invalid email"),
      body("username")
        .optional()
        .notEmpty()
        .withMessage("Username is required"),
      body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Password must have a minimum of 8 characters"),
    ];
  }
  return [
    body("email").isEmail().withMessage("Invalid email"),
    body("username").notEmpty().withMessage("username required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must have minimum of 8 characters"),
  ];
};

const validate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error });
  }

  next();
};

export { validationRules, validate };
