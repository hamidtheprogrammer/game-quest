import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel: mongoose.Model<IUser> = mongoose.model<IUser>(
  "users",
  userSchema
);

export { userModel, IUser };
