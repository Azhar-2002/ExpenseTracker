import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.routes.js";
import expenseRoute from "./routes/expense.routes.js";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Ensure this is correctly spelled
};

app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});