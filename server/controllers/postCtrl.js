const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

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
const getPosts = async (req, res) => {
  try {
    const Users = await postModel
      .find()
      .populate(
        "userId comments likes",
        "username password email comment userId "
      );
    res.send(Users);
  } catch (error) {
    console.log(error);
  }
};
const getOnePost = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await postModel
      .findOne({ _id: id })
      .populate("comments likes", "comment userId");
    res.send(post);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createPost, getPosts, getOnePost };
