import express from "express";
import dotenv from "dotenv";
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
// for logging https request to the backend console...
app.use(morgan("dev"));
// for getting server responce into the json we have to parsed.. ---> The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// In an Express application, app.use(cors()) is used to enable Cross-Origin Resource Sharing (CORS) for the application. CORS is a mechanism that allows web browsers to make cross-origin requests securely.
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
