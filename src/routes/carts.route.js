import { Router } from "express";

import { getAllCarts, getCartById, createCart, addProductToCart, deleteProductToCart, updateQuantityProductInCart, clearProductsToCart } from "../controllers/carts.controller.js";

const router = Router();

router.get('/', getAllCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductToCart);
router.put('/:cid/products/:pid', updateQuantityProductInCart);
router.delete('/:cid', clearProductsToCart);

export default router;
