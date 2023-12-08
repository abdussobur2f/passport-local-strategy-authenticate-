const mongoose = require("mongoose");

const UserSchcema = mongoose.Schema({
  username: {
    type: String,
  },

  googleId: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  
});


const User = mongoose.model("user", UserSchcema);
module.exports = User;