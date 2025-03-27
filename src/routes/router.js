import authRoutes from "./auth.route.js";
import cartsRoute from "./carts.route.js";
import productsRoute from "./products.route.js";
import userRoute from "./user.route.js";

import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoute);
router.use("/products", productsRoute);
router.use("/carts", cartsRoute);

export default router;
