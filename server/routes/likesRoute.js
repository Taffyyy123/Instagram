const Router = require("express");
const { likedPost, disLike } = require("../controllers/likesCtrl");
const likeRouter = Router();

likeRouter.post("/likedPost", likedPost);
likeRouter.delete("/disLike", disLike);

module.exports = likeRouter;
