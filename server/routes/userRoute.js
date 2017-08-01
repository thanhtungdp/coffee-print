import express from "express";
import passwordHash from "password-hash";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";
import User from "../models/user";

var router = express.Router();

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const { username, password, isAdmin } = req.body;
  if (!username || !password) {
    res.json({ error: true, message: "Empty" });
  }
  let isUserExists = await User.find({ username: username }).count();
  if (isUserExists) {
    res.json({ error: true, message: "User exists" });
    return;
  }
  let user = new User();
  user.username = username;
  user.password = passwordHash.generate(password);
  user.isAdmin = isAdmin ? true : false;
  await user.save();
  res.json(user);
});

router.put("/", authMiddleware, adminMiddleware, async (req, res) => {
  const { username, password, isAdmin } = req.body;
  if (!username) {
    res.json({ error: true, message: "Empty" });
  }
  let user = await User.findOne({ username });
  if (!user) res.json({ error: true, message: "Not find user" });
  if (password) {
    user.password = passwordHash.generate(password);
  }
  user.isAdmin = isAdmin ? true : false;
  await user.save();
  res.json(user);
});

router.delete("/:userId", authMiddleware, adminMiddleware, async (req, res) => {
  const { userId } = req.params;
  let user = await User.findOne({ _id: userId });
  if (!user) res.json({ error: true, message: "Not find user" });
  await User.findOneAndRemove({ _id: userId });
  res.json({
    success: true
  });
});

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json(users);
});

router.get("/init", async (req, res) => {
  let isUserExists = await User.find({ username: "admin" }).count();
  if (!isUserExists) {
    let user = new User();
    user.username = "admin";
    user.password = passwordHash.generate("admin_pro");
    user.isAdmin = true;
    await user.save();
    res.json({ createdAdmin: true });
  } else {
    res.json({ createdAdmin: true, isUserExists: true });
  }
});

export default router;
