import { DataTypes,Model,Optional } from "sequelize";
import sequelize from "../config/db";
export interface DepartmentAttributes {
    id:number;
    departmentName:string;
    location:string;
}
export interface DepartmentCreationAttributes 
extends Optional<DepartmentAttributes,"id">{}
class Department 
extends Model<
 DepartmentAttributes,DepartmentCreationAttributes
 >
 implements DepartmentAttributes
 {
    public id!: number;
    public departmentName!: string;
    public location!: string;
}
Department.init(
    {
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        departmentName: {
            type:DataTypes.STRING,
            allowNull:false
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName:"department",
        tableName:"department",
        timestamps:false
    }
);
export default Department;
