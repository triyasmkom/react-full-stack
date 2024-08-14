const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Routers
const postRouter = require("./routes/Posts");
app.use("/api/posts", postRouter);

const commentRouter = require("./routes/Comments");
app.use("/api/comments", commentRouter);

const usersRouter = require("./routes/Users");
app.use("/api/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/api/likes", likesRouter);

app.use("/", (req, res) => {
  res.send("API BACKEND");
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
