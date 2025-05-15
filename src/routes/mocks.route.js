import { Router } from "express";
import { createNewMockProducts, createNewMockUsers } from "../controllers/mock/mock.controller.js";

const router = Router();

router.get("/users/:n", createNewMockUsers);
router.get("/products/:n", createNewMockProducts);

export const usuariosMockRouter = router;