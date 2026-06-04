import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const User = sequelize.define("users", {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
});

export default User;