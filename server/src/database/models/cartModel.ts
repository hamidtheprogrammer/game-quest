import { model, Model, Schema } from "mongoose";
import { product } from "./productModel";

export type cartProps = {
  userId: Schema.Types.ObjectId;
  items:
    | { productId: product; quantity: number }[]
    | { productId: Schema.Types.ObjectId; quantity: number }[];
};

export type populatedCartProps = {
  userId: Schema.Types.ObjectId;
  items: { productId: product; quantity: number }[];
};

const cartSchema: Schema<cartProps> = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
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
});

const cartModel: Model<cartProps> = model<cartProps>("carts", cartSchema);

export default cartModel;
