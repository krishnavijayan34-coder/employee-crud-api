import { Sequelize } from "sequelize";
import { config } from "./config";

const sequelize = new Sequelize(
    config.database.database || "",
    config.database.dbuser || "",
    config.database.dbpassword || "",
    {
        host: config.database.dbhost || "127.0.0.1",
        dialect: "mysql"
    }
);
export default sequelize;