import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Employee = sequelize.define(
    "employee",
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
            type: DataTypes.STRING
        },

        age: {
            type: DataTypes.INTEGER
        }
    },

    {
        timestamps: false
    }
);

export default Employee;