const express = require("express");
const loginRouter = express.Router();
const User = require("../../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isvalidpass = await bcrypt.compare(req.body.password, user.password);
    if (user && isvalidpass) {
      const payload = {
        id: user._id,
        username: user.username,
        password: isvalidpass,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });

      res.status(200).send({
        success: true,
        message: "User is logged in successfully",
        token: "Bearer " + token,
      });
   
    } else {
      res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    res.status(401).json({
      error:"username not matcing"
    });
  }
});
module.exports = loginRouter;
