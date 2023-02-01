const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.user_sign_up = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    const user = new User({
      username: req.body.username,
      admin:req.body.admin_password === process.env.ADMIN_PASSWORD ? true : false,
      password: hash,
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};

exports.user_log_in = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication: ", err);
      return next(err);
    }
    if (!user) {
      console.error("No user found");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in: ", err);
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.user_log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("LOGGED OUT");
    res.redirect("/");
  });
};
