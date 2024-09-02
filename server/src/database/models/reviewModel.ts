import { Schema, model, Model } from "mongoose";

type reviewProps = {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  rating: number;
  comment: string;
};

const reviewSchema: Schema<reviewProps> = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  productId: { type: Schema.Types.ObjectId, required: true, ref: "products" },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const reviewModel: Model<reviewProps> = model<reviewProps>(
  "reviews",
  reviewSchema
);

export default reviewModel;
