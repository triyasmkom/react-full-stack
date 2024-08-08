const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { where } = require("sequelize");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: { PostId: postId },
  });
  res.json(comments);
});

router.post("/", async (req, res) => {
  const data = req.body;
  await Comments.create(data);
  res.json(data);
});
module.exports = router;
