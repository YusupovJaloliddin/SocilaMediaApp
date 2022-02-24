const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },
});

model("Post", postSchema);
