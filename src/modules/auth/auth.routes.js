import { Router } from "express";
import { login, register } from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// refresh + logout will come next step (Step 3)
export default router;

