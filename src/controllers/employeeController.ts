import Employee from "../models/employee";

export async function getAllEmployees() {
    return await Employee.findAll();
}

export async function getOneEmployee(id: number) {
    return await Employee.findByPk(id);
}

export async function insertEmployee(
    name: string,
    email: string,
    designation: string,
    age: number
) {
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
) {
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

export async function deleteEmployee(id: number) {
    return await Employee.destroy({
        where: { id }
    });
}