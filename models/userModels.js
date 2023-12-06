const mongoose = require("mongoose");

const UserSchcema = mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("user", UserSchcema);
module.exports = User;