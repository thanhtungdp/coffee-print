import express from "express";
import DrinkModel from "../models/drink";
import authMiddleware from "../middlewares/authMiddleware";

var router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  let drink = new DrinkModel({ name });
  if (!name) {
    res.json({ error: true, name: "Name empty" });
    return;
  }
  try {
    drink = await drink.save();
    res.json(drink);
  } catch (e) {
    res.json({ error: true });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { name, id } = req.body;
  let drink = await DrinkModel.findOne({ _id: id });
  if (drink && !name) {
    drink.name = name;
    await drink.save();
    res.json(drink);
  } else res.json({ error: true });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await DrinkModel.findOneAndRemove({ _id: req.params.id });
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const drinks = await DrinkModel.find({}).sort({ createdAt: -1 });
  res.json(drinks);
});

export default router;
