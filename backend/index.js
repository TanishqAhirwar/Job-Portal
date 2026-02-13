import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoute from "./routes/companyRoutes.js";
import jobRoute from "./routes/jobRoutes.js";

dotenv.config({})

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);

connectDB()
.then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})
