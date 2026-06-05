import { Router } from "express";
import { Role } from "../models/association";

const router = Router();


router.post("/create", async (req, res) => {
  try {
    const role = await Role.create({
      id: req.body.id,
      name: req.body.name
    });

    res.json(role);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;