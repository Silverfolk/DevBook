const jwt=require('jsonwebtoken');
const User=require('../models/auth');
const verifyToken=async (req,res,next)=>{
  try{
   const bearerHeader=req.headers["authorization"];
   if(typeof bearerHeader!=="undefined"){
    // verify the token 
    const beartoken=bearerHeader.split(" ")[1];
    const decode=jwt.verify(beartoken,process.env.JWT_SECRET);
    // decode will have the payload which we have putted while making the toke in the singin page 
    /*
{
  _id: '652e4d760f3cc69d9361508b',
  role: 'user',
  iat: 1697534811,
  exp: 1700126811
}
    */
   if(!decode._id){
    return res.status(404).json({message:"User not found by decode"});
   }
   const user=await User.findById(decode._id);
  //  console.log(user);
    if(!user){
      return res.status(404).json({message:"User not found by user"});
    }
    req.user=decode;
    
    next();
   }
   else{
    res.status(401).json({msg:"Token is required"});
   }
  }
  catch(err){
    res.status(500).json({msg:err+""});
  }
// if there would be not match in jwt then it will throw (jwt.verify) an exception and to handle this we have used try and catch block 
}

module.exports = verifyToken;