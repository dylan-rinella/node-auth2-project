const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");

const User = require("../users/users-model");

const { isValid } = require("../../utils/validation");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const credentials = req.body;
  try {
    if (isValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hashed = bcrypt.hashSync(credentials.password, rounds);
      credentials.password = hashed;
      const newUser = await User.add(credentials);
      res.status(201).json(newUser);
    } else {
      res.status(400).json("Please provide valid username and password");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (isValid(req.body)) {
      const tryUser = await User.findBy({ username: username }).first();
      if (tryUser && bcrypt.compareSync(password, tryUser.password)) {
        const token = generateToken(tryUser);
        res
          .status(200)
          .json({ message: `Welcome back ${tryUser.username}`, token });
      } else {
        res.status(401).json("Invalid Credentials");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;