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

// used middleware for Authenticate a User
router.post("/", auth, createTour);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/:id", auth, updateTour);
router.delete("/:id", auth, deleteTour);

router.get("/", getTours);
router.get("/:id", getTour);
router.get("/search", getToursBySearch);

export default router;
