import mongoose from "mongoose";
import paperSize from "../../src/config/paperSize";

const Store = new mongoose.Schema(
  {
    name: String,
    ip: String
  },
  {
    id: true
  }
);

Store.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Store.set("toJSON", {
  virtuals: true
});

Store.set("toObject", {
  virtuals: true
});

export default mongoose.model("Store", Store);
