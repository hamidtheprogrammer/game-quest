import { Router } from "express";
import { addReview } from "../controllers/reviewController";
import { authenticate } from "../middlewares/auth";

const reviewRouter = Router();

reviewRouter.route("/addreview/:productId").post(authenticate, addReview);

export default reviewRouter;
