import express from "express";
import slug from "slug";
import Pagination from "pagination-js";
import authMiddleware from "../middlewares/authMiddleware";
import ImageModel from "../models/image";
import imageType from "../../src/constants/imageType";
import multerUpload from "../config/multerUpload";
import DrinkModel from "../models/drink";
import { cropImageThumbnail } from "../utils";

var router = express.Router();

router.post("/", multerUpload.single("image"), async (req, res) => {
  try {
    const { tableNumber, drinkId } = req.body;
    let drink = await DrinkModel.findOne({ _id: drinkId });
    let totalImage = await ImageModel.find({}).count();
    let fileName = `${tableNumber}_${slug(drink.name)}_${totalImage + 1}`;
    let image = new ImageModel();
    cropImageThumbnail(req.file.filename);
    image.name = fileName;
    image.fileName = req.file.filename;
    image.drinkId = drink.id;
    image.tableNumber = tableNumber;
    await image.save();
    res.json(image);
  } catch (e) {
    res.json({ error: true });
  }
});

router.put("/print", authMiddleware, async (req, res) => {
  const { id } = req.body;
  let image = await ImageModel.findOne({ _id: id });
  if (!image) {
    res.json({ error: true });
  } else {
    image.type = imageType.PRINTED;
    await image.save();
    res.json(image);
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  await ImageModel.findOneAndRemove({ _id: req.body.id });
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const { type } = req.query;
  // await ImageModel.find({}).remove();
  let objectQuery = {};
  if (type !== imageType.ALL && type) {
    objectQuery.type = type;
  }
  const totalImages = await ImageModel.find(objectQuery).count();
  let pagination = new Pagination(req.query, totalImages).getPagination();
  const images = await ImageModel.find(objectQuery)
    .populate({
      path: "drinkId"
    })
    .sort({ createdAt: -1 })
    .skip(pagination.minIndex)
    .limit(pagination.itemPerPage);
  res.json({
    data: images,
    pagination
  });
});

export default router;
