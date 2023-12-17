const express = require("express");
const router = express.Router();
const middleware=require("../../middleware/authmiddle")
const { signUp, signIn } = require("../../controller/auth");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../../validators/auth");
const getUserInfo = require("../../controller/userinfo");


router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);


router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);
router.route("/").get(middleware,getUserInfo);

module.exports = router;