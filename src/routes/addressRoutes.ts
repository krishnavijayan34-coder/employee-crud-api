import express, {
    Request,
    Response,
    Router
} from "express";

import {
    getAllAddresses,
    createAddress
} from "../controllers/addressController";

const router: Router = express.Router();

router.get("/", async (
    req: Request,
    res: Response
): Promise<void> => {
    const data = await getAllAddresses();
    res.status(200).json(data);
});

router.post("/", async (
    req: Request,
    res: Response
): Promise<void> => {

    const { city, employeeId }: {
        city: string;
        employeeId: number;
    } = req.body;

    await createAddress({
        city,
        employeeId
    });

    res.status(201).json({
        message: "Address Created"
    });
});

export default router;