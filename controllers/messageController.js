const Message = require("../models/message");

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

// Handle book delete on POST.
exports.message_delete_post = (req, res) => {
  const message_id = req.params.message_id;

  Message.findByIdAndRemove(message_id, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

// Display book update form on GET.
exports.message_update_get = (req, res) => {
  const id = req.params.message_id;
  Message.findById(id, (err, message) => {
    if (err) return next(err);
    res.render("update", {title:"update message", message });
  });
};

// Handle book update on POST.
exports.message_update_post = (req, res) => {
  const message_id = req.params.message_id;
  const update = req.body;

  Message.findByIdAndUpdate(message_id, update, { new: true }, (err, doc) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
