import express, { Router } from "express";
const router = express.Router();

import { createTour, getTours } from "../controllers/tour.js";

router.post("/", createTour);
router.get("/", getTours);
// router.post("/googleSignIn", googleSignIn);

export default router;
