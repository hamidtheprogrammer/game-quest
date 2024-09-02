import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoute from "./routes/testRoute";
import { connectCloudinary, connectDB } from "./database/dbConfig";
import userRouter from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/adminRoutes";
import productRouter from "./routes/productRoutes";
import cartRouter from "./routes/cartRoutes";
import favouritesRouter from "./routes/favouritesRoutes";
import reviewRouter from "./routes/reviewRoutes";
import orderRouter from "./routes/orderRoutes";

dotenv.config();
const app = express();

connectDB();

connectCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(testRoute);
app.use(userRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(favouritesRouter);
app.use(reviewRouter);
app.use(orderRouter);

app.listen(9000, "0.0.0.0", () => {
  console.log("SERVER UP!!!");
});
