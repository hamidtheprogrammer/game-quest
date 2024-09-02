import Stripe from "stripe";
import { Request, Response } from "express";
import cartModel, { populatedCartProps } from "../database/models/cartModel";
import dotenv from "dotenv";
import orderModel from "../database/models/orderModel";

dotenv.config();

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const clientUrl = process.env.FRONTEND_URL;

const createCheckoutSession = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    if (!cart || !cart.items.length) {
      return res.status(404).json({ message: "No items to checkout" });
    }

    const lineItems = createLineItems(cart as populatedCartProps);

    const newOrder = new orderModel({
      userId: userId,
      items: cart.items,
      totalAmount: 100,
      status: "pending",
    });

    const session = await createSession(lineItems, "TEST_ORDER_ID");

    if (!session.id) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }

    newOrder.save();
    res.json({ id: session.id });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

const createLineItems = (cart: populatedCartProps) => {
  const lineItems = cart.items.map((element) => {
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: element.productId.price * 100,
        product_data: {
          name: element.productId.name,
        },
      },
      quantity: element.quantity,
    };

    return line_item;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    metadata: {
      orderId,
    },
    success_url: `${clientUrl}/order-status?sucess=true`,
    cancel_url: `${clientUrl}/detail/cancelled=true`,
  });

  return sessionData;
};

export { createCheckoutSession };
