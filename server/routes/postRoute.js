const Router = require("express");
const postController = require("../controllers/postCtrl");
const postRouter = Router();

postRouter.post("/createPost", postController.createPost);

module.exports = postRouter;
