import { Request, Response } from "express";
import { productModel } from "../database/models/productModel";
import favouritesModel from "../database/models/favouritesModel";

const addToFavourites = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId } = req.params;

  try {
    const productExists = await productModel.findById(productId);
    if (!productExists)
      return res.status(404).json({ message: "Product not found" });

    const addProductToFavourites = await favouritesModel.findOneAndUpdate(
      {
        userId,
      },
      { $addToSet: { items: { productId } } },
      { new: true, upsert: true }
    );

    if (addProductToFavourites) {
      res.status(200).json(addProductToFavourites);
    } else {
      res
        .status(400)
        .json({ message: "Could not add to favourites. Please try again" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Please try again" });
    console.log(error);
  }
};

const removeFromFavourites = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId } = req.params;

  try {
    const favouritesUpdated = await favouritesModel.findOneAndUpdate(
      {
        userId,
      },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (favouritesUpdated) {
      res.status(200).json(favouritesUpdated);
    } else {
      res
        .status(400)
        .json({ message: "Could not update favourites. Please try again" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Please try again" });
    console.log(error);
  }
};

const getFavourites = async (req: Request, res: Response) => {
  const { userId } = req.user;
  try {
    const favourites = await favouritesModel.findOne({ userId }).populate({
      path: "items.productId",
      populate: {
        path: "reviews",
      },
    });
    if (favourites) {
      res.status(200).json(favourites);
    } else {
      res.status(404).send({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

export { addToFavourites, removeFromFavourites, getFavourites };
