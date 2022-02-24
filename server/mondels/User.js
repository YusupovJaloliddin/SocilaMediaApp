const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/dvngnmkau/image/upload/v1643611942/e6ft1zhh82vocweysnj5.png",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  ],
  following: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
});

model("User", userSchema);
