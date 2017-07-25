import mongoose from "mongoose";

const Drink = new mongoose.Schema(
  {
    name: String,
    Drink: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    id: true
  }
);

Drink.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Drink.set("toJSON", {
  virtuals: true
});

Drink.set("toObject", {
  virtuals: true
});

export default mongoose.model("Drink", Drink);
