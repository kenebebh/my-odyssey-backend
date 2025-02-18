import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDatabase } from "./config/databaseConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import experienceRoutes from "./routes/experiencesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRoutes);
app.use("/events", eventRoutes);
app.use("/top-experiences", experienceRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "hello my queen" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
