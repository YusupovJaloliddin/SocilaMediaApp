const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys/index");
// const cors = require("cors");
app.use(express.json());
// app.use(cors());

const PORT = 5000;
mongoose.connect(MONGO_URI);

require("./mondels/User");
require("./mondels/Post");

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

//mongodb connect
mongoose.connection.on("connected", () => {
  console.log("MongoDB was connected succesfully");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connnecting to MongoDB", err);
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
