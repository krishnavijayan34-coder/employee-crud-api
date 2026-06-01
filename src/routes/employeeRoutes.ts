import express from "express";

import {
    getAllEmployees,
    getOneEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employeeController";

const router = express.Router();

router.get("/", async (req, res) => {
    const employees = await getAllEmployees();
    res.json(employees);
});

router.get("/:id", async (req, res) => {
    const employee = await getOneEmployee(Number(req.params.id));
    res.json(employee);
});

router.post("/", async (req, res) => {
    const { name, email, designation, age } = req.body;

    await insertEmployee(
        name,
        email,
        designation,
        age
    );

    res.send("Employee Created");
});

router.put("/:id", async (req, res) => {
    const { name, email, designation, age } = req.body;

    await updateEmployee(
        Number(req.params.id),
        name,
        email,
        designation,
        age
    );

    res.send("Employee Updated");
});

router.delete("/:id", async (req, res) => {
    await deleteEmployee(Number(req.params.id));

    res.send("Employee Deleted");
});

export default router;