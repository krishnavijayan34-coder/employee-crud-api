import { Response } from "express";
import { AuthRequest } from "../middleware/verifyToken";

export const adminBoard = (req: AuthRequest, res: Response) => {
  res.json({ message: "Admin content accessed " });
};