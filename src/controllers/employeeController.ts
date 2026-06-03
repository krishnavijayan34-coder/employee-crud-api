import Employee from "../models/employee";
import Address from "../models/address";

interface EmployeeData {
    name: string;
    email: string;
    designation: string;
    age: number;
}

export async function getAllEmployees(): Promise<Employee[]> {
    return await Employee.findAll({
        include: [
            {
                model: Address,
                as: "address"
            }
        ]
    });
}

export async function getOneEmployee(id: number) {
    return await Employee.findByPk(id, {
        include: [
            {
                model: Address,
                as: "address"
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