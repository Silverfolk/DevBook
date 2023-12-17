const express = require('express');
const User=require('../models/auth');

const getUserInfo= async (req, res, next) => {
  try{
    // console.log(req.user);
    const userinfo=await User.findById(req.user._id).select('-hash_password');//'-hash_password' is used to remove the password from the user try to access this 
    res.json(userinfo);
  }
  catch(err){
res.status(400).json({message: err.message});
  }
}
module.exports =getUserInfo;