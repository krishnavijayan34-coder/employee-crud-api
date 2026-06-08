import express from "express";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import moderatorRoutes from "./routes/moderator.routes";
import profileRoutes from "./routes/ProfileRoute";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/moderator", moderatorRoutes);
app.use("/api/profile",profileRoutes);

app.listen(6000, () => {
  console.log("Server running on 6000");
});