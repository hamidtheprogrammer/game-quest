import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

type productValidationProps = {
  update?: Boolean;
};

const productValidationRules = ({ update }: productValidationProps) => {
  if (update) {
    return [
      body("name").optional().isString().withMessage("Name required"),
      body("description")
        .optional()
        .isString()
        .withMessage("Description required")
        .bail()
        .custom((value) => {
          if (value.split(" ").length !== 10) {
            throw new Error("Minimum of 10 words for product description");
          }
        }),
      body("price").optional().isNumeric().withMessage("Price must be numeric"),
      body("stock").optional().isNumeric().withMessage("Stock must be numeric"),
      body("age").optional().isNumeric().withMessage("Age must be numeric"),
      body("genre").optional().isArray().withMessage("Genre must be a list"),
      body("genre.*")
        .optional()
        .isString()
        .withMessage("Each genre must be string"),
      body("imageFiles")
        .optional()
        .isArray()
        .withMessage("images must be a list"),
      body("imageFiles.*")
        .optional()
        .isString()
        .withMessage("Each image must be string"),
    ];
  }
  return [
    body("name").isString().withMessage("Name required"),
    body("description")
      .isString()
      .withMessage("Description required")
      .bail()
      .custom((value) => {
        if (value.split(" ").length < 10) {
          throw new Error("Minimum of 10 words for product description");
        }
      }),
    body("price").isNumeric().withMessage("Price must be numeric"),
    body("stock").isNumeric().withMessage("Stock must be numeric"),
    body("age").isNumeric().withMessage("Age must be numeric"),
    body("genre").isArray().withMessage("Genre must be a list"),
    body("genre.*").isString().withMessage("Each genre must be string"),
    body("imageFiles").isArray().withMessage("images must be a list"),
    body("imageFiles.*").isString().withMessage("Each image must be string"),
  ];
};

const productValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors });
  }
  next();
};

export { productValidationRules, productValidate };
