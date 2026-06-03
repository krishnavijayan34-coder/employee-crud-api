import express from "express";
import Address from "../models/address";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.json(address);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    const data = await Address.findAll();
    res.json(data);
});

export default router;