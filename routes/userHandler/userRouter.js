
const express = require('express');
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const User = require("../../models/userModels")



userRouter.post("/register",  async (req,res)=>{
 try {

const password = req.body.password;

      const hasspassworsd = await bcrypt.hash(password,10);

      const nweUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hasspassworsd,
      });

      const user =await nweUser.save();

   
      res.status(201).json({
        message:"account created"
      });
 } catch (error) {
    res.status(401).json({
        error:error
    })
 }
})


module.exports = userRouter;