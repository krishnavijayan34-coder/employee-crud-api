import express, { Application} from "express";
import sequelize from "./config/db";
import employeeRoutes from "./routes/employeeRoutes";

import { config } from "./config/config";
const app : Application = express();

app.use(express.json());

app.use("/employees", employeeRoutes);

sequelize.sync()
    .then(() => {
        console.log("Database Connected");

        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    })
    .catch((err:unknown) => {
       if (err instanceof Error) {
            console.error("Database connection failed:", err.message);
        } else {
            console.error("Database connection failed with an unknown error:", err);
        }
    });