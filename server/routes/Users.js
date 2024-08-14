const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");
const { where } = require("sequelize");

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
        username: user.username,
        id: user.id,
        status: "Login Success",
      });
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/validate", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { username } = req.user;
  const user = await Users.findOne({ where: { username: username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "wrong password  entered" });
  });

  bcrypt.hash(newPassword, 10).then(async (hash) => {
    await Users.update({ password: hash }, { where: { id: user.id } });
    res.json("success change password");
  });
});

module.exports = router;
