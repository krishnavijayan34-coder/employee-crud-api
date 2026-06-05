import { Router } from "express";
import { adminBoard } from "../controllers/admin.controller";
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.get("/admin", verifyToken, isAdmin, adminBoard);

export default router;