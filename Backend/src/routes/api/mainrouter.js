const express=require('express');
const router = express.Router(); // Create an instance of Express Router
const authRouter = require("./auth");
const profileRouter= require("./profile");
const postRouter = require("./post");
const userRouter = require("./user");

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/post', postRouter);
router.use('/user', userRouter);


module.exports=router;