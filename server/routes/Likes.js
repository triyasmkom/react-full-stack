const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
const { Op } = require("sequelize");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;

  const UserId = req.user.id;

  const found = await Likes.findAll({
    where: {
      PostId: PostId,
      UserId: UserId,
    },
  });

  if (found.length === 0) {
    await Likes.create({
      PostId: PostId,
      UserId: UserId,
    });

    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: {
        [Op.and]: [{ PostId: PostId }, { UserId: UserId }],
      },
    });

    res.json({ liked: false });
  }
});

module.exports = router;
