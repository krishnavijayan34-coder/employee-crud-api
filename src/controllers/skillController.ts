import Skill from "../models/skill";

export async function createSkill(skillName:string): Promise<Skill> {
    return await Skill.create({ skillName});
}

export async function getAllSkills():Promise<Skill[]> {
    return await Skill.findAll();
}