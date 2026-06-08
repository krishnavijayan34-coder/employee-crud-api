import prisma from "../config/prisma";
import { Response, NextFunction } from "express";
import { AuthRequest } from "./verifyToken";

export const isAdmin = async (
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

    if (!user || user.role.name !== "admin") {
      return res.status(403).json({ message: "Admin required" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};