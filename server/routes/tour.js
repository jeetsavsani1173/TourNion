import express, { Router } from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createTour, getTours } from "../controllers/tour.js";

router.post("/", auth, createTour);
router.get("/", getTours);

export default router;
