import express, { Application} from "express";
import sequelize from "./config/db";
import employeeRoutes from "./routes/employeeRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import { config } from "./config/config";
import "./models/employee";
import "./models/department";
import "./models/address";
import "./models/associations";
import addressRoutes from "./routes/addressRoutes";
const app : Application = express();

app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/departments",departmentRoutes);
app.use("/address", addressRoutes);
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