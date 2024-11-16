const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8080;

const userRouter = require("./routes/userRoute");
app.use("/user", userRouter);
const postRouter = require("./routes/postRoute");
app.use("/post", postRouter);

app.listen(PORT, console.log(`running on ${PORT}`));
