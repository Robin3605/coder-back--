import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { passportCall } from "../middleware/passport.middleware.js";
import { authRole } from "../middleware/authRole.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:pid", getProductById);
router.post("/", passportCall("jwt"), authRole(["admin"]), createProduct);
router.put("/:pid", passportCall("jwt"), authRole(["admin"]), updateProduct);
router.delete("/:pid", passportCall("jwt"), authRole(["admin"]), deleteProduct);

export default router;
