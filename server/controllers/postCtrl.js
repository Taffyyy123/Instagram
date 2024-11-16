const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const postModel = require("../models/postModel");
const app = express();
app.use(express.json());

const connectToDb = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://tsolmn9:Taffyyy12@test.1s5hd.mongodb.net/IG?retryWrites=true&w=majority&appName=TEST"
  );
  if (res) console.log("db connected");
};
connectToDb();

const createPost = async (req, res) => {
  try {
    const body = req.body;
    const { userId } = body;
    const response = await postModel.create(body);

    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: response._id,
      },
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createPost = createPost;
