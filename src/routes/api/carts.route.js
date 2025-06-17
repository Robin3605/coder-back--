import { Router } from "express";

import {
  getCartById,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
  purchaseCart,
} from "../../controllers/carts.controller.js";
import { passportCall } from "../../middleware/passport.middleware.js";
import { authRole } from "../../middleware/authRole.middleware.js";

const router = Router();


router.get("/:cid", getCartById);

router.post(
  "/:cid/products/:pid",
  passportCall("jwt"),
  authRole(["user", "admin"]),
  addProductToCart
);
router.delete("/:cid/products/:pid", deleteProductToCart);
router.put("/:cid/products/:pid", updateQuantityProductInCart);
router.delete("/:cid", clearProductsToCart);
router.get(
  "/:cid/purchase",
  passportCall("jwt"),
  authRole(["user"]),
  purchaseCart
);

export default router;
