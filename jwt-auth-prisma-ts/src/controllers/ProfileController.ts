import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/verifyToken";

export const createProfile = async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, phone } = req.body;

  const userId = req.userId; 

  const profile = await prisma.profile.create({
    data: {
      firstName,
      lastName,
      phone,
      userId: userId!
    }
  });

  res.json(profile);
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.userId; 

  const profile = await prisma.profile.findUnique({
    where: { userId: userId! }
  });

  res.json(profile);
};