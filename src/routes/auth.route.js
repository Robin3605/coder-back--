import { Router } from "express";
import { authRole } from "../middleware/authRole.middleware.js";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";

import { passportCall } from "../middleware/passport.middleware.js";

const router = Router();

router.post("/login", passportCall("login"), login);
router.post("/register", passportCall("register"), register);
router.get("/logout", logout);
router.get(
  "/profile",
  passportCall("jwt"),
  authRole(["admin", "user"]),
  profile
);

export default router;
