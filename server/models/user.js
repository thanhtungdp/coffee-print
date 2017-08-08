import mongoose from "mongoose";
import paperSize from '../../src/config/paperSize';

const User = new mongoose.Schema(
  {
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    paperSize: {
      width: {
        type: Number, default: paperSize.SIZE.width
      },
	    height: {
		    type: Number, default: paperSize.SIZE.height
	    },
	    paddingRight: {
		    type: Number, default: paperSize.SIZE.paddingRight
	    },
	    paddingBottom: {
		    type: Number, default: paperSize.SIZE.paddingBottom
	    },
	    circleSize: {
        type: Number, default: paperSize.IMAGE_SIZE_PRINT
      }
    }
  },
  {
    id: true
  }
);

User.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
User.set("toJSON", {
  virtuals: true
});

User.set("toObject", {
  virtuals: true
});

export default mongoose.model("User", User);
