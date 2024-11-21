const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const PORT = 8080;

const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");
const likeRouter = require("./routes/likesRoute");

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);

const connectToDb = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://tsolmn9:Taffyyy12@test.1s5hd.mongodb.net/IG?retryWrites=true&w=majority&appName=TEST"
  );
  if (res) console.log("db connected");
};
connectToDb();

app.listen(PORT, console.log(`running on ${PORT}`));
