import { Request, Response } from "express";

export const adminBoard = (req: Request, res: Response) => {
  res.send("Admin Dashboard");
};