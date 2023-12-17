const express= require('express');
const middleware= require('../../middleware/authmiddle');
const router=express.Router();
const Profile=require("../../models/profile");
const {check,validationResult}=require('express-validator');
const {singedinfo,SaveOrUpdateProfile,getAllUsersProfile,getUserProfileByid,deleteProfile,UpdateUserExperience,deleteUserExperiencebyId,UpdateUserEducation,deleteUserEducationbyId,getUserProfileGithub}=require('../../controller/profile');


// router.get('/',middleware,(req,res)=>{
//     res.send('Profile  Route');
// })

router.get('/me',middleware,singedinfo);

router.post('/',middleware,
check('status', 'Status is required').notEmpty(),
check('skills', 'Skills is required').notEmpty(),
(req,res,next)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
}
,SaveOrUpdateProfile)

router.get('/',middleware,getAllUsersProfile);

router.get('/user/:user_id',getUserProfileByid);

router.delete('/',middleware,deleteProfile );

router.put('/experience',middleware,
check('title', 'Title is required').notEmpty(),
check('company', 'Company is required').notEmpty(),
check('from', 'From date is required and needs to be from the past')
  .notEmpty()
  .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  (req,res,next)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
  },
UpdateUserExperience);

router.delete('/experience/:exp_id',middleware,deleteUserExperiencebyId);

// Education Route
router.put('/education',middleware,
check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty(),
  (req,res,next)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
  },
UpdateUserEducation);

// Github Route
router.get('/github/:username',getUserProfileGithub);

router.delete('/education/:edu_id',middleware,deleteUserEducationbyId);
module.exports=router;