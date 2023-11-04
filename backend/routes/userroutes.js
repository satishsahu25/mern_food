const express = require("express");
const { body, validationResult } = require("express-validator");
// const { usersignup } = require('../controlllers/usercontroller');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

router.post(
  "/signup",
  [
    body("password", "incorrect password").isLength({ min: 5 }),
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, location, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    try {
      await User.create({
        name: name,
        password: secpass,
        location: location,
        email: email,
      }).then(
        res.json({
          success: true,
        })
      );
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
router.post("/login", [body("email").isEmail()], async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  
  try {
    let userfind = await User.findOne({
      email: email,
    });

    if (!userfind) {
      return res.status(400).json({
        error: "Wrong credentials",
        success: false,
      });
    }
    const pswcompare = await bcrypt.compare(password, userfind.password); //body, encrypted

    if (pswcompare) {
      const jwtSECRET = "fds413fdsFDSFS2";
      const data = {
        user: { id: userfind._id },
      };
      const token = jsonwebtoken.sign(data, jwtSECRET);
      return res.status(200).json({ userfind, success: true, token: token });
    }
    return res.status(400).json({
      error: "Wrong credentials",
      success: false,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
