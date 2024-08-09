const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("./../middleware/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: { PostId: postId },
  });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const data = req.body;
  const usename = req.user.username;
  data.username = usename;
  await Comments.create(data);
  res.json(data);
});
module.exports = router;
