const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const cors = require("cors");
const mongoose = require("./config/db");

const authRoutes = require("./routes/auth.route");
const projectRoutes = require("./routes/project.route");
const taskRoutes = require("./routes/task.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
