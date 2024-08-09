const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        Users.create({
          username,
          password: hash,
        }).catch((e) => {
          return res.json(e);
        });
      })
      .catch((e) => {
        return res.json(e);
      });

    res.json("SUCCESS");
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      where: { username: username },
    });

    if (!user) res.json({ error: "User doesn't exist" });
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong username or password" });

      const accessToken = sign(
        {
          username: user.username,
          id: user.id,
        },
        "importantsecretkey"
      );

      res.json({
        accessToken: accessToken,
        status: "Login Success",
      });
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
