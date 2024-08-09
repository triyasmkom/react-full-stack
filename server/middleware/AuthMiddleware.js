const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecretkey");

    if (validToken) {
      req.user = validToken;
      return next();
    }
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = { validateToken };
