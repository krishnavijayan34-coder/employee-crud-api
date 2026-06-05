import { Response } from "express";
import { AuthRequest } from "../middleware/verifyToken";

export const moderatorBoard = (req: AuthRequest, res: Response) => {
  res.json({ message: "Moderator content accessed" });
};