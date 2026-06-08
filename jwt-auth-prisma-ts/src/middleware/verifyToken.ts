import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
  roles?: string;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      roles: string;
    };

    req.userId = decoded.userId;
    req.roles = decoded.roles;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};