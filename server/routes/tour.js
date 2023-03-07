import express, { Router } from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createTour,
  deleteTour,
  getTour,
  getTours,
  getToursByUser,
  updateTour,
} from "../controllers/tour.js";

router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTour);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/:id", auth, updateTour);
router.delete("/:id", auth, deleteTour);

export default router;
