import { Router } from "express";
import {authRole, authenticate} from "../middleware/authRole.middleware.js";
import { login, register, logout, profile } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/profile/:uid", authenticate, authRole, profile);

export default router;