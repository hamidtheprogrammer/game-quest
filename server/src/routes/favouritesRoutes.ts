import { Router } from "express";
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from "../controllers/favouritesController";
import { authenticate } from "../middlewares/auth";

const favouritesRouter = Router();

favouritesRouter
  .route("/addtofavourites/:productId")
  .post(authenticate, addToFavourites);
favouritesRouter.route("/getfavourites").get(authenticate, getFavourites);
favouritesRouter
  .route("/removefromfavourites/:productId")
  .delete(authenticate, removeFromFavourites);

export default favouritesRouter;
