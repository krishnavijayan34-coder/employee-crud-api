import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DATABASE,
  USER,
  PASSWORD,
  HOST,
  DB_PORT
} = process.env;


if (!DATABASE || !USER || !PASSWORD || !HOST) {
  throw new Error("Missing environment variables");
}

const sequelize = new Sequelize(
  DATABASE,
  USER,
  PASSWORD,
  {
    host: HOST,
    port: Number(DB_PORT) || 3306,
    dialect: "mysql"
  }
);

export default sequelize;