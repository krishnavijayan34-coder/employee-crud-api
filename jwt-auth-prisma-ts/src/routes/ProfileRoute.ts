import express from "express";
import { createProfile, getProfile } from "../controllers/ProfileController";
import {verifyToken} from "../middleware/verifyToken";
import { Router } from "express";
const router = express.Router();

router.post("/profile", verifyToken, createProfile);
router.get("/profile", verifyToken, getProfile);

export default router;

