import { Request, Response } from "express";
import reviewModel from "../database/models/reviewModel";
import { productModel } from "../database/models/productModel";

const addReview = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId } = req.params;
  const { rating, comment } = req.body;

  const numerizeRating = parseInt(rating);

  if (isNaN(numerizeRating) || numerizeRating < 1 || numerizeRating > 5) {
    return res.status(404).json({ message: "Invalid rating number" });
  }

  if (!productId) {
    return res.status(404).json({ message: "Product not found" });
  }

  try {
    const productExists = await productModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }
    const addReview = new reviewModel({ userId, productId, rating, comment });
    if (addReview) {
      addReview.save();
      await productModel.findByIdAndUpdate(productId, {
        $push: { reviews: addReview._id },
      });

      res.status(200).json({ message: "Review successfully added" });
    } else {
      res
        .status(400)
        .json({ message: "Unable to add review, Please try again" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export { addReview };
