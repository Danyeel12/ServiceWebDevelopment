const mongoose = require("mongoose");

const schema = mongoose.Schema({
  first: String,
  last: String,
  email: String,
  phone: String,
  title: String,
  type: String,
  budget: Number,
  message: String
});

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Contact = mongoose.model("Contact", schema);

module.exports = Contact;
