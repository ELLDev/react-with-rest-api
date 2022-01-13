const express = require("express");
const router = express.Router();
const User = require("../models").User;
const { authenticateUser } = require("../middleware/auth-user");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

router.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

router.get(
  "/",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let user;
    try {
      user = await User.findOne({
        where: { emailAddress: req.loggedUser.emailAddress },
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    let user;
    try {
      user = await User.create(req.body);
      res.location("/");
      res.status(201).end();
    } catch (error) {
      console.log("ERROR: ", error.name);
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        console.log({errors});
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
