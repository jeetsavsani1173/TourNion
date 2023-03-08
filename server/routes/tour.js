import express, { Router } from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createTour,
  deleteTour,
  getTour,
  getTours,
  getToursBySearch,
  getToursByUser,
  updateTour,
} from "../controllers/tour.js";

router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/search", getToursBySearch);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/:id", auth, updateTour);
router.delete("/:id", auth, deleteTour);
router.get("/:id", getTour);

export default router;
