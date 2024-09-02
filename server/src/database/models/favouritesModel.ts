import { Schema, model, Model } from "mongoose";

export type favouritesProps = {
  userId: Schema.Types.ObjectId;
  items: { productId: Schema.Types.ObjectId }[];
};

const favouritesSchema: Schema<favouritesProps> = new Schema({
  userId: { type: String, required: true, ref: "users" },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    },
  ],
});

const favouritesModel: Model<favouritesProps> = model<favouritesProps>(
  "favourites",
  favouritesSchema
);

export default favouritesModel;
