const commentsModel = require("../models/commentModel");
const postModel = require("../models/postModel");

const createComment = async (req, res) => {
  try {
    const body = req.body;
    const { userId, postId } = body;
    const response = await commentsModel.create(body);
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: response._id,
      },
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const getComment = async (req, res) => {
  try {
    const post = await commentsModel
      .find()
      .populate("postId userId", "caption postImg, username email proImg");
    res.send(post);
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    await commentsModel.findByIdAndDelete(id);
    await commentsModel.findByIdAndUpdate(id, {
      $pull: {
        comments: response._id,
      },
    });
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
};

const editComment = async (req, res) => {
  const { id, updatingComment } = req.body;
  try {
    await commentsModel.findByIdAndUpdate(
      id,
      {
        comment: updatingComment,
      },
      { new: true }
    );
    res.send("success");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createComment, getComment, deleteComment, editComment };
