import express from "express";

import {signup,signin} from "../controllers/auth.controller";

import {checkDuplicateEmail}from "../middleware/verifySignUp";

const router =express.Router();

router.post("/signup",checkDuplicateEmail,signup);

router.post("/signin",signin);

export default router;