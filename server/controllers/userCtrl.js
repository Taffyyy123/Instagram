const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const postModel = require("../models/postModel");
const { post } = require("../routes/userRoute");
const app = express();
app.use(express.json());

const connectToDb = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://tsolmn9:Taffyyy12@test.1s5hd.mongodb.net/IG?retryWrites=true&w=majority&appName=TEST"
  );
  if (res) console.log("db connected");
};
connectToDb();

const signupUser = async (req, res) => {
  try {
    const body = req.body;
    const { username, password, email, proImg } = body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newBody = {
      username,
      password: hashedPassword,
      email,
      proImg,
    };
    const response = await userModel.create(newBody);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const Posts = await userModel.find().populate("posts");
    res.send(Posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports.signupUser = signupUser;
module.exports.getUser = getUser;
