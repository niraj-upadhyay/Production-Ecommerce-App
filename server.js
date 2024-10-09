import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";

// configure environment variables
dotenv.config();

// connect to database
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// create express app
const app = express();

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging HTTP requests
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// Define routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Rest Api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Define a test route
app.get("/", (req, res) => {
  res.send("Hello users");
});

// Define port
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgCyan.white);
});
