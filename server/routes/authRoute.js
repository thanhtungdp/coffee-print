import express from "express";
import passwordHash from "password-hash";
import { createToken } from "../utils";
import authMiddleware from "../middlewares/authMiddleware";
import User from "../models/user";
import PaperSize from "../../src/config/paperSize";
var router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    if (passwordHash.verify(password, user.password)) {
      res.json({
        token: createToken({ isAdmin: user.isAdmin, userId: user._id }),
        isAdmin: req.isAdmin,
        ...user
      });
    } else {
      res.json({ error: true });
    }
  } else {
    res.json({ error: true });
  }
});

router.post("/update-paper-size", authMiddleware, async (req, res) => {
  const { width, height, paddingRight, paddingLeft, circleSize } = req.body;
  const user = req.user;
  user.paperSize = {
    width,
    height,
    paddingLeft,
    paddingRight,
    circleSize
  };
  await user.save();
  res.json(user);
});

router.post("/reset-paper-size", authMiddleware, async (req, res) => {
  const user = req.user;
  user.paperSize = {
    width: PaperSize.SIZE.width,
    height: PaperSize.SIZE.height,
    paddingRight: PaperSize.SIZE.paddingRight,
    paddingLeft: PaperSize.SIZE.paddingRight,
    circleSize: PaperSize.IMAGE_SIZE_PRINT
  };
  await user.save();
  res.json(user);
});

router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});

export default router;
