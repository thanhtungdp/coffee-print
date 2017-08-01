import express from "express";
import passwordHash from "password-hash";
import { createToken } from "../utils";
import authMiddleware from "../middlewares/authMiddleware";
import User from "../models/user";
var router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    if (passwordHash.verify(password, user.password)) {
      res.json({ token: createToken(user.isAdmin), isAdmin: req.isAdmin });
    } else {
      res.json({ error: true });
    }
  } else {
    res.json({ error: true });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  res.json({
    isAdmin: req.isAdmin
  });
});

export default router;
