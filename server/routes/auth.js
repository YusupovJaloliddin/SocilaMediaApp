const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys/index");
const login = require("../midlleware/login");

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !name || !password) {
    res.status(422).json({
      error: "Please add all the fields",
    });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }
    bcrypt.hash(password, 10).then((hashedPass) => {
      const user = new User({
        email,
        name,
        password: hashedPass,
        pic,
      });
      user
        .save()
        .then((user) => {
          res.json({ msg: "Added succesfully" });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(422)
      .json({ error: "Iltimos Email manzilingiz va Parolingizni kiriting" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({
        error: "Parolingiz yoki Email manzilingizni xato kiritdingiz",
      });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ msg: "Succedfully sined in" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = savedUser;
          res.json({
            token: token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res
            .status(422)
            .json({ error: "Passwordingizni xato kiritdingiz" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = router;
