import { Schema, model, Model } from "mongoose";

export interface product {
  name: string;
  price: number;
  images: string[];
  description: string;
  stock: number;
  genre: string[];
  age: number;
  reviews: Schema.Types.ObjectId[];
}

const productSchema: Schema<product> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true, max: 2 }],
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  genre: [{ type: String, required: true, max: 5 }],
  age: { type: Number, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});

const productModel: Model<product> = model<product>("products", productSchema);

export { productModel };
