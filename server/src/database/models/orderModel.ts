import mongoose, { Schema, Document, Model } from "mongoose";
import { cartProps } from "./cartModel";

interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: cartProps["items"];
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Order schema
const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "products",
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "canceled"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the model
const orderModel: Model<IOrder> = mongoose.model<IOrder>("orders", orderSchema);

export default orderModel;
