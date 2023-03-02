import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
mongoose.set("strictQuery", false);

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/tour", tourRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

const MONGODB_URL =
  "mongodb+srv://tournionwebapp:TourNionWebApp@cluster0.vngvfvr.mongodb.net/tourNionDB?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Runnig on ${port}`);
    });
  })
  .catch((err) => {
    console.log(`${err} did not connect to mongoDB.`);
  });
