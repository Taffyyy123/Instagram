const likeModel = require("../models/likesModel");
const postModel = require("../models/postModel");

const likedPost = async (req, res) => {
  try {
    const body = req.body;
    const { postId, userId } = req.body;
    const response = await likeModel.create(body);
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        likes: response._id,
      },
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const disLike = async (req, res) => {
  const { id, postId } = req.body;
  await likeModel.findByIdAndDelete(id);
  await postModel.findByIdAndUpdate(postId, {
    $pull: {
      likes: id,
    },
  });
  res.send("dislike");
};

module.exports = { likedPost, disLike };
