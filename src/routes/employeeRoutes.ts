import express, { Request, Response, Router } from "express";
import Employee from "../models/employee";

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
    const { name, email, designation, age, departmentId } = req.body;

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
    const { name, email, designation, age, departmentId } = req.body;

    await updateEmployee(id, name, email, designation, age, departmentId);

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

router.post("/assign-skills", async (req: Request, res: Response): Promise<void> => {
    try {
        const { employeeId, skillIds } = req.body;

        const employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        await (employee as any).addSkills(skillIds);

        res.status(200).json({
            message: "Skills assigned successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error assigning skills",
            error
        });
    }
});

router.put("/:id/skills", async (req: Request, res: Response): Promise<void> => {
    try {
        const employeeId = Number(req.params.id);
        const { skillIds } = req.body;

        const employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        await (employee as any).setSkills(skillIds);

        res.status(200).json({
            message: "Skills updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating skills",
            error
        });
    }
});

router.delete("/:id/skills", async (req: Request, res: Response): Promise<void> => {
    try {
        const employeeId = Number(req.params.id);

        const employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        await (employee as any).setSkills([]);

        res.status(200).json({
            message: "Skills removed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error removing skills",
            error
        });
    }
});

export default router;