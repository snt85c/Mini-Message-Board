const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, ref: "User", required: true },
  date: { type: Date, required: true },
});

// Virtual for book's URL
MessageSchema.virtual("new_date").get(function () {
  // We don't use an arrow function as we'll need the this object
  return new Date();
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
