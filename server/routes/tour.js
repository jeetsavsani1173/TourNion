import express, { Router } from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import cache from "../middleware/routeCache.js";

import {
  createTour,
  deleteTour,
  getRelatedTours,
  getTour,
  getTours,
  getToursBySearch,
  getToursByTags,
  getToursByUser,
  likeTour,
  updateTour,
} from "../controllers/tour.js";

router.post("/", auth, createTour);
router.get("/", cache(30), getTours);
router.get("/search", cache(60), getToursBySearch);
router.post("/relatedTours", getRelatedTours);
router.get("/tag/:tag", cache(60), getToursByTags);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/like/:id", auth, likeTour);
router.patch("/:id", auth, updateTour);
router.delete("/:id", auth, deleteTour);
router.get("/:id", getTour);

export default router;
