import Employee from "../models/employee";
import Department from "../models/department";
import Skill from "../models/skill";
interface EmployeeData {
    name: string;
    email: string;
    designation: string;
    age: number;
    departmentId: number;
}

export async function getAllEmployees(): Promise<Employee[]> {
    return await Employee.findAll({
        include: [
            {
                model: Department,
                as: "department"
            },
            {
                model:Skill,
                as:"skills"
            }
        ]
    });
}

export async function getOneEmployee(id: number) {
    return await Employee.findByPk(id, {
        include: [
            {
                model: Department,
                as: "department"
            },
            {
                model:Skill,
                as:"skills"
            }
        ]
    });
}

export async function insertEmployee(
    employee: EmployeeData
): Promise<Employee> {
    return await Employee.create(employee);
}

export async function updateEmployee(
    id: number,
    name: string,
    email: string,
    designation: string,
    age: number,
    departmentId: number
): Promise<[number]> {

    return await Employee.update(
        {
            name,
            email,
            designation,
            age,
            departmentId
        },
        {
            where: { id }
        }
    );
}

export async function deleteEmployee(
    id: number
): Promise<number> {

    return await Employee.destroy({
        where: { id }
    });
}