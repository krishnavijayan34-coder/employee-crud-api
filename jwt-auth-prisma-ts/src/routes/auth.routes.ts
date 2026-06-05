import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller";
import { checkDuplicateUser } from "../middleware/verifySignup";

const router = Router();

router.post("/signup", checkDuplicateUser, signup);
router.post("/signin", signin);

export default router;