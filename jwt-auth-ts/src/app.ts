import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db"

import "./models/association";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import moderatorRoutes from "./routes/moderator.routes";
import roleRoutes from "./routes/role.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", adminRoutes);
app.use("/api/test", moderatorRoutes);
app.use("/api/roles", roleRoutes);
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});