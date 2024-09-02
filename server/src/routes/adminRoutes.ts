import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  forceDeleteUser,
  getAllUsers,
  getUserById,
  updateProduct,
} from "../controllers/adminController";
import { authenticate } from "../middlewares/auth";
import {
  productValidate,
  productValidationRules,
} from "../middlewares/validateProduct";
import multer from "multer";

const adminRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

adminRouter.route("/get-users").post(authenticate, getAllUsers);
adminRouter.route("/get-profile-details").post(authenticate, getUserById);
adminRouter.route("/force-delete-user").post(authenticate, forceDeleteUser);
adminRouter
  .route("/add-product")
  .post(
    authenticate,
    productValidationRules({ update: false }),
    productValidate,
    upload.array("imageFiles", 2),
    addProduct
  );
adminRouter
  .route("/delete-product/:productId")
  .delete(authenticate, deleteProduct);
adminRouter
  .route("/update-product/:productId")
  .put(
    authenticate,
    productValidationRules({ update: true }),
    productValidate,
    upload.array("imageFiles", 2),
    updateProduct
  );

export default adminRouter;
