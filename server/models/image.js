import mongoose from "mongoose";
import imageType from "../../src/constants/imageType";
var { Schema } = mongoose;

const Image = new mongoose.Schema(
  {
    name: String,
    fileName: String,
    type: { type: String, default: imageType.NEWS },
    tableNumber: Number,
    drinkId: { type: Schema.ObjectId, ref: "Drink" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isTrashed: { type: Boolean, default: false },
	  clientIP: String
  },
  {
    id: true
  }
);

Image.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Image.set("toJSON", {
  virtuals: true
});

Image.set("toObject", {
  virtuals: true
});

export default mongoose.model("Image", Image);
