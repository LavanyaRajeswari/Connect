import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRotue } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", arcjetProtection, login);
router.post("/logout", logout);

router.put("/update-profile", protectRotue, updateProfile);
router.get("/check", protectRotue, (req, res) =>
  res.status(200).json(req.user)
);

export default router;
