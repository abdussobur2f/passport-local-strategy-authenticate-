const mongoose = require("mongoose");

const UserSchcema = mongoose.Schema({
  username: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
  
});


const User = mongoose.model("user", UserSchcema);
module.exports = User;