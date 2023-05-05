import express, { Router } from "express";
const router = express.Router();

import { signup, signin, googleSignIn, updateUserDetails } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
router.patch("/:id", updateUserDetails)

export default router;
