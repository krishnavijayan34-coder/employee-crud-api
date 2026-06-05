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

    const roles = await prisma.userRole.findMany({
      where: { userId },
      include: { role: true }
    });

    const ok = roles.some(
      (r) => r.role?.name === "moderator"
    );

    if (!ok) {
      return res.status(403).json({ message: "Moderator required" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};