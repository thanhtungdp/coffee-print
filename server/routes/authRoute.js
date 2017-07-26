import express from "express";
import { USERNAME, PASSWORD } from "../../src/constants/userLogin";
import { createToken } from "../utils";
var router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    res.json({ token: createToken() });
  } else {
    res.json({ error: true });
  }
});

export default router;
