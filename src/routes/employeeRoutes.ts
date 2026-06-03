import express, { Request, Response, Router } from "express";

import {
    getAllEmployees,
    getOneEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employeeController";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);
    const employee = await getOneEmployee(id);
    res.status(200).json(employee);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {

    const {
        name,
        email,
        designation,
        age,
        departmentId
    }: {
        name: string;
        email: string;
        designation: string;
        age: number;
        departmentId: number;
    } = req.body;

    await insertEmployee({
        name,
        email,
        designation,
        age,
        departmentId
    });

    res.status(201).json({
        message: "Employee Created"
    });
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {

    const id: number = Number(req.params.id);

    const {
        name,
        email,
        designation,
        age,
        departmentId
    }: {
        name: string;
        email: string;
        designation: string;
        age: number;
        departmentId: number;
    } = req.body;

    await updateEmployee(
        id,
        name,
        email,
        designation,
        age,
        departmentId
    );

    res.status(200).json({
        message: "Employee Updated"
    });
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {

    const id: number = Number(req.params.id);

    await deleteEmployee(id);

    res.status(200).json({
        message: "Employee Deleted"
    });
});

export default router;