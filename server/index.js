const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

app.use("/", (req, res) => {
  res.send("Hello world");
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
