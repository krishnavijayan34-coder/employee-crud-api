import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./config/db";
import corsOptions from "./config/cors.config";
import router from "./routes/auth.routes";

import Role from "./models/role";
import "./models/Associations"; 

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);


const startServer = async () => {
    try {
        await sequelize.sync();

        
        const count = await Role.count();

        if (count === 0) {
            await Role.bulkCreate([
                { id: 1, name: "user" },
                { id: 2, name: "manager" },
                { id: 3, name: "admin" }
            ]);
        }

        console.log("Database Connected");

        app.listen(process.env.PORT, () => {
            console.log("Server Started");
        });

    } catch (error) {
        console.error("DB Error:", error);
    }
};

startServer();