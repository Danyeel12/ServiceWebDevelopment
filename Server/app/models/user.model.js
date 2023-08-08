/*const mongoose = require("mongoose");
 
const User = mongoose.model(
  "users",
  new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
      }
    ]
  })
);
 
module.exports = User;*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;