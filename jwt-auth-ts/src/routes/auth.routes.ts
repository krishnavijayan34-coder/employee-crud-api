import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail,checkRolesExisted } from "../middleware/verifySignup";
const router = Router();

router.post("/signup", [checkDuplicateUsernameOrEmail,checkRolesExisted],signup);
router.post("/signin", signin);

export default router;