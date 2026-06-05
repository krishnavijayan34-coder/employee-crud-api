import { Router } from "express";
import { moderatorBoard } from "../controllers/moderator.controller";
import { verifyToken } from "../middleware/verifyToken";
import { isModerator } from "../middleware/isModerator";

const router = Router();

router.get(
  "/",
  verifyToken,
  isModerator,
  moderatorBoard
);

export default router;