import express from "express";
import { USERS } from "../../src/constants/userLogin";
import { createToken } from "../utils";
import authMiddleware from "../middlewares/authMiddleware";
var router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(user => user.username === username);
  if (user && user.password === password) {
    res.json({ token: createToken(user.isAdmin), isAdmin: req.isAdmin });
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
