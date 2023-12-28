const router = require("express").Router();

const { check, validationResult } = require("express-validator");
const { users } = require("../db");

const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");

router.post(
  "/signup",
  [
    check("email", " Please provide a valid email").isEmail(),
    check(
      "password",
      "Please provide a password that is greater than 5 characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { password, email } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: " This user already exists",
          },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      email,
      password: hashedPassword,
    });

    const token = JWT.sign(
      {
        email,
      },
      "fn32iuhf392hg32hf392hg3279gh239gh32nvh82",
      {
        expiresIn: 3600000,
      }
    );
  }
);

res.json({
  token,
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = users.fill((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  let isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  const token = JWT.sign(
    {
      email,
    },
    "fn32iuhf392hg32hf392hg3279gh239gh32nvh82",
    {
      expiresIn: 3600000,
    }
  );
});

res.json({
  token,
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
