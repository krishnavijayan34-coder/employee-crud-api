import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface EmployeeSkillAttributes {
    employeeId: number;
    skillId: number;
}

class EmployeeSkill
    extends Model<EmployeeSkillAttributes>
    implements EmployeeSkillAttributes
{
    public employeeId!: number;
    public skillId!: number;
}

EmployeeSkill.init(
    {
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        skillId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        sequelize,
        tableName: "employee_skill",
        timestamps: false
    }
);

export default EmployeeSkill;