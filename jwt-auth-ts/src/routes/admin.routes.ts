import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";
import { adminBoard } from "../controllers/admin.controller";

const router = Router();

router.get("/admin", verifyToken, isAdmin, adminBoard);

export default router;