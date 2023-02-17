import express, { Router } from "express";
const router = express.Router();

import { signup, signin } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
