import Employee from "../models/employee";

interface EmployeeData {
    name: string;
    email: string;
    designation: string;
    age: number;
}

export async function getAllEmployees(): Promise<any> {
    return await Employee.findAll();
}

export async function getOneEmployee(
    id: number
): Promise<any> {
    return await Employee.findByPk(id);
}

export async function insertEmployee(
    name: string,
    email: string,
    designation: string,
    age: number
): Promise<any> {

    return await Employee.create({
        name,
        email,
        designation,
        age
    });
}

export async function updateEmployee(
    id: number,
    name: string,
    email: string,
    designation: string,
    age: number
): Promise<[number]> {

    return await Employee.update(
        {
            name,
            email,
            designation,
            age
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