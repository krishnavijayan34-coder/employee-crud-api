import { Request, Response } from "express";

export const moderatorBoard = (req: Request, res: Response) => {
  res.send("Moderator Dashboard");
};