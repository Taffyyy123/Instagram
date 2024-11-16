const Router = require("express");
const userController = require("../controllers/userCtrl");
const userRouter = Router();

userRouter.post("/createUser", userController.signupUser);
userRouter.get("/getUser", userController.getUser);

module.exports = userRouter;
