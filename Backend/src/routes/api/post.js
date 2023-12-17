const express= require('express');
const router=express.Router();
const middleware=require('../../middleware/authmiddle');
const {check,validationResult}=require('express-validator');
const {createPost,GetAllPosts,getPostById,deleteById,LikePostByPostId,UnLikePostByPostId,PostCommentByPostId,RemoveCommentByCommentIdAndPostId}=require('../../controller/post')

router.get('/', middleware,GetAllPosts);
router.post('/',
middleware,
check('text','text is required').not().isEmpty(),
(req,res,next)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
},
createPost);

router.get('/:id',middleware,getPostById);

router.delete('/:id',middleware,deleteById);

router.put('/like/:post_id',middleware,LikePostByPostId);

router.put('/unlike/:post_id',middleware,UnLikePostByPostId);

router.post('/comment/:post_id',middleware,
check('text','text is required').not().isEmpty(),
(req,res,next)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
}
,PostCommentByPostId);

router.delete('/comment/:post_id/:comment_id',middleware
,RemoveCommentByCommentIdAndPostId);

module.exports=router;