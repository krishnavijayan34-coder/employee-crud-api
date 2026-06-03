import {
    DataTypes,
    Model,
    Optional
} from "sequelize";

import sequelize from "../config/db";

export interface EmployeeAttributes {
    id: number;
    name: string;
    email: string;
    designation: string;
    age: number;
    departmentId:number;
}

export interface EmployeeCreationAttributes
    extends Optional<EmployeeAttributes, "id"> {}

class Employee
    extends Model<
        EmployeeAttributes,
        EmployeeCreationAttributes
    >
    implements EmployeeAttributes
{
    public id!: number;
    public name!: string;
    public email!: string;
    public designation!: string;
    public age!: number;
    public departmentId!: number;
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        designation: {
            type: DataTypes.STRING,
            allowNull: true
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        departmentId: {
            type:DataTypes.INTEGER,
            allowNull:true
        }
    },
    {
        sequelize,
        modelName: "employee",
        tableName: "employee",
        timestamps: false
    }
);

export default Employee;