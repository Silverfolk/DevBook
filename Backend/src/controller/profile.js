
/*
GET API : api/profile/me 
private access 
description:return sign in user infomation 
*/
const Profile=require('../models/profile');
const User=require('../models/auth');
const axios=require('axios');
const singedinfo= async (req,res)=>{
    try{
        const profile= await Profile.findOne({user: req.user._id}).populate('user',['username','avatar']);//i twill first find the user bu it's id then issi id ka reference leke dusari table "User"(capital U)) usse name and avaatar ki value daal dega  
       
        if(!profile){
           return res.status(400).json({message: "User Not found"});
        }
        
        res.status(200).json({message:profile});
        
    }catch(err){
        return res.status(500).json({message: err.message});
    }
};

/*
Post API : api/profile
private access 
description:used to creeate a user profile (not signed up) or to update user profile if the user existed 
*/
const SaveOrUpdateProfile = async (req,res) =>{
  try{
    let  {
     skills,
     website,
     linkedin,
     twitter,
     status,
     location,
     bio,
     githubusername,
     youtube,
     facebook,
     company,
     ...rest 
    }=req.body;

    let profileField={};
    profileField.user=req.user._id;
    if(website)profileField.wesbite=website;
    if(company)profileField.company=company;
    if(location)profileField.location=location;
    if(bio)profileField.bio=bio;
    if(status)profileField.status=status;
    if(githubusername)profileField.githubusername=githubusername;
    if(skills){
        profileField.skills=skills.split(',').map(skills=>skills.trim());
        //java    , html    ,    csss,
        //after split[java    , html    ,    csss]
        // after map [java,html,css]
    }
   
    profileField.social={};
    if(youtube) profileField.social.youtube=youtube;
    if(linkedin) profileField.social.linkedin=linkedin;
    if(twitter) profileField.social.twitter=twitter;
    if(facebook) profileField.social.facebook=facebook;
   

    // Saving or updating data in the database 
    let profile=await Profile.findOne({user:req.user._id});
    if(profile){//if user is find then we will update his/her profile
        profile=await Profile.findOneAndUpdate(
            {user:req.user._id},
            {$set:profileField},
            {new:true}
        )
        return res.status(200).json({profile});
    }

    profile=new Profile(profileField);
    await profile.save();//saving the new user profile 
    res.status(200).json({profile});
  }catch(err){
    res.status(500).json({message: err+""});
  }
}

/*
GET API : api/profile 
public access 
description:returns the information of all the users 
try to add the logic where only admin can access these profiles 
*/
const getAllUsersProfile= async (req, res) => {
  try{
    const AdminAuth=await User.findById(req.user._id);
  //   if(!AdminAuth){
  //    return  res.status(404).json({msg: "User not found"});
  //   }
 
  //  if(AdminAuth.role!=='admin'){
  //   return  res.status(404).json({msg: "You're not the admin to access this route "});
  //  }
   const profile =await Profile.find().populate('user',['username','avatar']);
   if(!profile){
  return   res.status(404).json({msg: 'User are not present'})
   }
   res.status(200).json({profile});
   
  }
  catch(err){
   res.status(500).json({message: err+""});
  }
};

/*
Post API : api/profile/user/:user_id
public access 
description:used to return user profile using user_id
*/

const getUserProfileByid= async (req,res)=>{
  try{
   const profile = await Profile.findById(req.params.user_id).populate('user',['username','avatar']);//we will put Profile id not User id in parameters
  if(!profile) {
    return res.status(404).json({message:"User not found"});
  }
 
  res.status(200).json({profile});
}
  catch(err){
  console.log(err);
   res.status(500).json({message:err});
  }
}

const deleteProfile = async (req, res) => {
try{
 await Profile.findOneAndDelete({user:req.user._id});//here from profile we take id from ref varaible user
 await User.findOneAndDelete({_id:req.user._id});//here it is user id
  res.status(200).json({msg:"User Deleted Successfully"});
}
catch(err){
  res.status(500).json({message:err+""});
}
}

/*
Put API : api/profile/experience
private access 
description:Add user Experience
*/
const UpdateUserExperience= async (req, res) => {
  try{
    const profile=await Profile.findOne({user:req.user._id});
    if(!profile){
      return res.status(404).json({message:"User does not exist"});
    }
    //  now putting data in the database experience 
    profile.experience.unshift(req.body);
    await profile.save();
    res.status(200).json(profile);
  }
  catch(err){
 res.status(500).json({message:err+""});
  }
 }

 /*
Delete API : api/profile/experience/:exp_id
private access 
description:delete user Experience by exp_id
*/

const deleteUserExperiencebyId= async (req, res) =>{
  try{
   const profile=await Profile.findOne({user:req.user._id});
    if(!profile){
      return res.status(404).json({message:"User does not exist"});
    }
    // finding the index to be removed 
   
    const idx=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
    profile.experience.splice(idx,1);
    await profile.save();
    res.status(200).json(profile)
  }
  catch(err){
    res.status(500).json({message:err+""});
  }
}

/*
Put API : api/profile/education
private access 
description:Add user Education
*/
const UpdateUserEducation= async (req, res) => {
  try{
    const profile=await Profile.findOne({user:req.user._id});
    if(!profile){
      return res.status(404).json({message:"User does not exist"});
    }
    //  now putting data in the database experience 
    profile.education.unshift(req.body);
    await profile.save();
    res.status(200).json(profile);
  }
  catch(err){
 res.status(500).json({message:err+"hi there "});
  }
 }

 /*
Delete API : api/profile/education/:exp_id
private access 
description:delete user Experience by exp_id
*/

const deleteUserEducationbyId= async (req, res) =>{
  try{
   const profile=await Profile.findOne({user:req.user._id});
    if(!profile){
      return res.status(404).json({message:"User does not exist"});
    }
    // finding the index to be removed 
   
    const idx=profile.education.map(item=>item.id).indexOf(req.params.edu_id);
    profile.education.splice(idx,1);
    await profile.save();
    res.status(200).json(profile);
  }
  catch(err){
    res.status(500).json({message:err+""});
  }
}

/*
Get API : api/profile/github/:username
public access 
description:get user's github profile using username 
*/

const getUserProfileGithub = async (req, res) => {
  try {
    const { username } = req.params;
    const uri = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;

    // for header read documentation of github user api 
    const axiosRequest = {
      method: 'get',
      url: uri,
      headers: {
        auth: `token ${process.env.GITHUB_CLIENT_SECRET}`
      }
    };

    const gitHubResponse = await axios(axiosRequest);
    return res.json(gitHubResponse.data);
  } catch (err) {
    res.status(500).json({ message: err + "" });
  }
}



module.exports={singedinfo,SaveOrUpdateProfile,getAllUsersProfile,getUserProfileByid,deleteProfile,UpdateUserExperience,deleteUserExperiencebyId,UpdateUserEducation,deleteUserEducationbyId,getUserProfileGithub};
 