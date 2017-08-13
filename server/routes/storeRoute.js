import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";
import Store from "../models/store";
import { getClientIP } from "../utils";

var router = express.Router();

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const { name, ip } = req.body;
  if (!name || !ip) {
    res.json({ error: true, message: "Empty" });
  }
  let store = new Store();
  store.name = name;
  store.ip = ip ? ip : getClientIP(req);
  await store.save();
  res.json(store);
});

router.put("/:storeId", authMiddleware, adminMiddleware, async (req, res) => {
  const { name, ip } = req.body;
  const { storeId } = req.params;
  let store = await Store.findOne({ _id: storeId });
  if (!store) res.json({ error: true, message: "Not find store" });
  store.name = name;
  store.ip = ip ? ip : getClientIP(req);
  store.save();
  res.json(store);
});

router.delete(
  "/:storeId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { storeId } = req.params;
    let store = await Store.findOne({ _id: storeId });
    if (!store) res.json({ error: true, message: "Not find store" });
    await Store.findOneAndRemove({ _id: storeId });
    res.json({
      success: true
    });
  }
);

router.get("/", async (req, res) => {
  const stores = await Store.find({}).sort({ createdAt: -1 });
  res.json(stores);
});

export default router;
