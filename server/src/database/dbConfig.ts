import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export const connectDB = async () => {
  let connected;
  try {
    if (!connected) {
      await mongoose.connect(process.env.DATABASE_URL as string, {
        dbName: "GameQuest",
        bufferCommands: true,
      });
      connected = true;
      console.log("Database connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
