import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { isModerator } from "../middleware/isModerator";
import { moderatorBoard } from "../controllers/moderator.controller";

const router = Router();

router.get("/moderator", verifyToken, isModerator, moderatorBoard);

export default router;