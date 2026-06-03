import { DataTypes,Model,Optional } from "sequelize";
import sequelize from "../config/db";

export interface SkillAttributes {
    id:number;
    skillName:string;
}
export interface SkillCreationAttributes 
    extends Optional<SkillAttributes,"id"> {}
class Skill
    extends Model<SkillAttributes,SkillCreationAttributes>
    implements SkillAttributes
    {
        public id!: number;
        public skillName!: string;
    }
    Skill.init(
        {
            id: {
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true
            },
            skillName: {
                type:DataTypes.STRING,
                allowNull:false
            }
        },
        {
            sequelize,
            tableName:"skill",
            modelName:"skill",
            timestamps:false
        }
    );
    export default Skill;