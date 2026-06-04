import {DataTypes,Model,Optional} from "sequelize";

import sequelize from "../config/db";

export interface RoleAttributes{
    id:number;
    name:string;
}

export interface RoleCreationAttributes
extends Optional<RoleAttributes,"id">{}

class Role extends Model<RoleAttributes,RoleCreationAttributes>
 implements RoleAttributes{

    public id!:number;
    public name!:string;
}

Role.init(
{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize,
    tableName:"roles"
}
);

export default Role;