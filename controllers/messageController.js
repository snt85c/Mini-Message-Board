const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const async = require("async");


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Display book create form on GET.
exports.message_create_get = (req, res, next) => {
  res.render("form", {
    title: "Create message",
  });
};

exports.message_list = (req, res, next) => {
  Message.find({}, function(err, messages) {
    if (err) {
      return res.status(400).send({
        message: 'Error: ' + err
      });
    }
    res.render("index", { title: "Message List", messages, count: messages.length});
  });
};

// Handle book create on POST.
exports.message_create_post = function(req, res) {
  const message = new Message({
    user: req.body.user,
    text: req.body.text,
    date: new Date()
  });

  message.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Error: ' + err
      });
    }
    res.redirect("/")
  });
};

// Display book delete form on GET.
exports.book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
