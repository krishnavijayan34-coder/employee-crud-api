import express, { Request, Response, Router } from "express";
import Skill from "../models/skill";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const { skills }: { skills?: string[] } = req.body;

        if (skills && Array.isArray(skills)) {
            const createdSkills = await Promise.all(
                skills.map((skillName: string) =>
                    Skill.create({ skillName })
                )
            );

            res.status(201).json({
                message: "Skills Created Successfully",
                data: createdSkills
            });

        } else {
            const { skillName }: { skillName: string } = req.body;

            const skill = await Skill.create({ skillName });

            res.status(201).json({
                message: "Skill Created Successfully",
                data: skill
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error creating skill",
            error
        });
    }
});

router.get("/", async (_req: Request, res: Response): Promise<void> => {
    try {
        const skills = await Skill.findAll();

        res.status(200).json({
            message: "Skills fetched successfully",
            data: skills
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching skills",
            error
        });
    }
});

export default router;