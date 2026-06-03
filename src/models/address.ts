import { DataTypes,Model,Optional } from "sequelize";
import sequelize from "../config/db";

export interface AddressAttributes {
    id: number;
    city: string;
    employeeId: number;
}

export interface AddressCreationAttributes
    extends Optional<AddressAttributes, "id"> {}

class Address
    extends Model<
        AddressAttributes,
        AddressCreationAttributes
    >
    implements AddressAttributes {

    public id!: number;
    public city!: string;
    public employeeId!: number;
}
Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "address",
        tableName: "address",
        timestamps: false
    }
);

export default Address;