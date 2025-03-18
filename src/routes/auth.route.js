import { Router } from "express";
import {authRole} from "../middleware/authRole.middleware.js";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import {checkTokenCookie} from "../middleware/tokenCookie.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/profile", checkTokenCookie, authRole(["admin", "user"]), profile);

export default router;