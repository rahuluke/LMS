import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

// http://localhost:8000/api/v1/user/register
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
