import cartModel from "../database/models/cartModel";
import { Request, Response } from "express";
import { productModel } from "../database/models/productModel";

const addToCart = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId, quantity } = req.params;

  const numerizeQuantity = parseInt(quantity);
  if (isNaN(numerizeQuantity) || numerizeQuantity < 1) {
    return res.status(404).json({ message: "Invalid quantity" });
  }

  try {
    const productExists = await productModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (productExists.stock < numerizeQuantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const addProductToCart = {
      productId: productExists._id,
      quantity: numerizeQuantity,
    };

    const updateCart = await cartModel
      .findOneAndUpdate(
        { userId },
        {
          $addToSet: { items: addProductToCart },
        },
        { new: true, upsert: true }
      )
      .populate("items.productId");

    if (updateCart) {
      productExists.stock -= numerizeQuantity;
      await productModel.findByIdAndUpdate(productExists._id, productExists);
      res.status(200).json(updateCart);
    } else {
      res
        .status(404)
        .json({ message: "Could not save to cart, Please try again" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Please try again" });
    console.log(error);
  }
};

const getCart = async (req: Request, res: Response) => {
  const { userId } = req.user;
  try {
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId")
      .select("-items._id");
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart is empty" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Please try again" });
    console.log(error);
  }
};

const updateCart = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId, quantity } = req.params;

  const numerizeQuantity = parseInt(quantity);

  if (isNaN(numerizeQuantity) || numerizeQuantity === 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    const productExists = await productModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartExists = await cartModel.findOne({ userId });
    if (!cartExists) {
      return res.status(404).json({ message: "cart not found" });
    }

    const productExistsInCart = cartExists.items.find((product) => {
      return product.productId.toString() === productId;
    });

    if (!productExistsInCart) {
      return res
        .status(404)
        .json({ message: "Cart does not have requested product" });
    }

    if (numerizeQuantity < 0) {
      if (productExistsInCart.quantity + numerizeQuantity <= 0) {
        return res
          .status(400)
          .json({ message: "New quantity cannot be less than zero" });
      }
    }

    if (productExists.stock < numerizeQuantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const updateCart = {
      ...cartExists,
      items: cartExists.items.map((itm) => {
        return itm.productId.toString() === productId
          ? { ...itm, quantity: (itm.quantity += numerizeQuantity) }
          : itm;
      }),
    };

    const returnUpdatedCart = await cartModel.findOneAndUpdate(
      { userId },
      updateCart,
      { new: true }
    );

    if (returnUpdatedCart) {
      productExists.stock -= numerizeQuantity;
      await productModel.findByIdAndUpdate(productId, productExists);
      res.status(200).json(returnUpdatedCart);
    } else {
      res.status(400).json({ message: "Failed to update cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Please try again" });
    console.log(error);
  }
};

const removeItemFromCart = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId } = req.params;
  try {
    const productExists = await productModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartExists = await cartModel.findOne({ userId });
    if (!cartExists) {
      return res.status(404).json({ message: "cart not found" });
    }

    const productExistsInCart = cartExists.items.find((itm) => {
      return itm.productId.toString() === productId;
    });

    console.log(productExistsInCart);

    if (!productExistsInCart) {
      res.status(400).json({ message: "Could not find product in cart" });
    }

    const quantity = productExistsInCart?.quantity;

    const updatedCart = await cartModel
      .findOneAndUpdate(
        { userId },
        {
          $pull: { items: { productId } },
        },
        { new: true }
      )
      .populate("items.productId");

    if (updatedCart) {
      productExists.stock += quantity as number;
      await productModel.findByIdAndUpdate(productId, productExists);
      res.status(200).json(updatedCart);
    } else {
      res.status(400).json({ message: "Failed to update cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Please try again" });
    console.log(error);
  }
};

export { addToCart, getCart, updateCart, removeItemFromCart };
