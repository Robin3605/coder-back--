import { Router } from "express";
import { authRole } from "../../middleware/authRole.middleware.js";
import {
  login,
  register,
  logout,
  profile,
} from "../../controllers/auth.controller.js";

import { passportCall } from "../../middleware/passport.middleware.js";
import { validateSchema } from "../../middleware/validateSchema.middleware.js";
import { loginSchema } from "../../schemas/login.schema.js";
import { registerSchema } from "../../schemas/register.schema.js";

const router = Router();

router.post(
  "/login",
  validateSchema(loginSchema),
  passportCall("login"),
  login
);
router.post(
  "/register",
  validateSchema(registerSchema),
  passportCall("register"),
  register
);
router.post("/logout", logout);
router.get(
  "/profile",
  passportCall("jwt"),
  authRole(["admin", "user"]),
  profile
);

export default router;
