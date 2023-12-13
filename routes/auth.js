const router = require("express").Router();

const { check, validationResult } = require("express-validator");
const { users } = require("../db");

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
  (req, res) => {
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

    if(user){
        res.status(400).json({
            'errors': [
                {
                    'msg': " This user already exists"
                }
            ]
        })
    }

    res.send("Validation Past");
  }
);

module.exports = router;
