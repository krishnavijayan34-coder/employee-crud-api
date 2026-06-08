import prisma from "../config/prisma";
import { Response, NextFunction } from "express";
import { AuthRequest } from "./verifyToken";

export const isModerator = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true }
    });

    if (!user || user.role.name !== "moderator") {
      return res.status(403).json({ message: "Moderator required" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};