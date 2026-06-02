import Department from "../models/department";
interface DepartmentData {
    departmentName:string;
    location:string;
}
export async function getAllDepartments():Promise<Department[]> {
    return await Department.findAll();
}
export async function getOneDepartment(id:number):Promise<Department| null> {
    return await Department.findByPk(id);
    
}
export async function insertDepartment(department:DepartmentData):Promise<Department> {
    return await Department.create(department);
    
}
export async function updateDepartment(
    id:number,departmentName:string,location:string
): Promise<[number]>{
    return await Department.update(
        {
            departmentName,location
        },
        {
            where:{id}
        }
    );
}
export async function deleteDepartment(id:number) :Promise<number> {
    return await Department.destroy({
        where: {id}
    });
}