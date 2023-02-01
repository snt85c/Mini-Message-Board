require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcryptjs")



module.exports = {
  passport,app
};

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dev_db_url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.k6aysbi.mongodb.net/?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB, {
    dbName: "minimessageboard",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

var indexRouter = require("./routes/index");
var newRouter = require("./routes/new");
var app = express();


passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log("ERROR")
        return done(err);
      }
      if (!user) {
        console.log("incorrect username")
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log("ERROR")
          return done(err);
        }
        if (!isMatch) {
          console.log("incorrect password")
          return done(null, false, { message: "Incorrect password" });
        }
        console.log("LOGGED IN")
  
        return done(null, user);
      });
    });
  })
  );
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/new", newRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
