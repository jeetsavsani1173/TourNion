import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

// routes
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

// default
const log = console.log;

// server
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// loading env variables
dotenv.config();

// connecting to database
connectDB(app);
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
});

// routes api
app.use("/users", userRouter);
app.use("/tour", tourRouter);
