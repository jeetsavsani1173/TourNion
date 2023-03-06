import express, { Router } from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createTour, getTour, getTours, getToursByUser } from "../controllers/tour.js";

router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTour);
router.get("/userTours/:id",auth,getToursByUser);

export default router;
