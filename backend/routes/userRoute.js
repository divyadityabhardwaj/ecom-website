import express from "express";
import { createNewUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(createNewUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export default router; 
