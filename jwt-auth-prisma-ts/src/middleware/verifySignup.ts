import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const checkDuplicateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }]
    }
  });

  if (user) {
    return res.status(400).json({
      message: "Username or Email already exists"
    });
  }

  next();
};