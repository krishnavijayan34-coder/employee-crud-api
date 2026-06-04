import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db";

const Role = sequelize.define("roles",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    name:DataTypes.STRING
});
export default Role;