const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("./../middleware/AuthMiddleware");
const { where } = require("sequelize");

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
  await Comments.create(data).then((res) => {
    data.id = res.dataValues.id;
  });

  res.json(data);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json({ status: "success" });
});
module.exports = router;
