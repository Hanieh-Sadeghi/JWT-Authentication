const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "No Token found !!!",
        },
      ],
    });
  }
  try {
    let user = await JWT.verify(
      token,
      "fn32iuhf392hg32hf392hg3279gh239gh32nvh82"
    );

    req.user = user.email;
    next()
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: " Token invalid !!!",
        },
      ],
    });
  }
};
