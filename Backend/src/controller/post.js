const User=require('../models/auth');
const Post=require('../models/post');
/*
POST api/posts
descrption:- Create a new post
private access
*/

const createPost=async (req, res) =>{
 try{
     const user=await User.findById(req.user._id);
     const newPost=new Post({
        text:req.body.text,
        name:user.username,
        avatar:user.avatar,
        userId:req.user._id
     });
     const post=await newPost.save();
     res.status(200).json({post});
 }
 catch(err){
    res.status(500).json({message: err+""});
 }
}

/*
Get api/posts
descrption:- Get all posts 
private access
*/

const GetAllPosts = async (req,res) =>{
    try {
        const posts=await Post.find().sort({data:-1});
        if(!posts){
            return res.status(404).json({message:"No Post are present now"});
        }

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json({message: err});
    }
}

/*
Get api/posts/:id
descrption:- Get post by id 
private access
*/
const getPostById= async (req, res) =>{
    try{
      const post =await Post.findById(req.params.id);
      if(!post){
        return res.status(404).json({message:"Post not found"});
      }

      res.status(200).json(post);
    }
    catch (err) {
        if(err.kind==='ObjectId'){
            return res.status(404).json({message:"Post not found"});
        }
     res.status(500).json({message: err+""});
    }
}

/*
Delete api/posts/:id
descrption:- delete the post with the given id and make sure  th person deleting the post is the author/owner of the post 
private access
*/

const deleteById= async (req, res) =>{
try {
   const post = await Post.findById(req.params.id);
   if(post.userId.toString()!==req.user._id){
    return res.status(404).json({message:"Post can only deleted by the Post owner Only."});
   } 

   await Post.findByIdAndDelete(req.params.id);
   res.status(200).json({message:"Post removed successfully"});
} catch (err) {
    res.status(500).json({message: err+""});
}
}

/*
Put api/posts/like/:post_id
descrption:- like the post using req.user(jwt token) for user and in post_id the user id will be added 
private access
*/

const LikePostByPostId= async (req, res) => {
try {
    const post=await Post.findById(req.params.post_id);
    if(!post){
        return res.status(400).json({msg:"Post Not Found"});
    }
    if(post.likes.filter(likes => likes?.user?.toString()===req.user_id).length>0){
        // toString is used as to convert objectid into String other Object will compare the address and we will get false even if the value matches 
        // User has already liked this
        return res.status(400).json({msg:"User already liked this"});
    }
    post.likes.unshift(req.user._id);
    await post.save();
    res.status(200).json(post.likes);
} catch (err) {
    res.status(500).json({message: err+""});
}
}


/*
Put api/posts/unlike/:post_id
descrption:- unlike the post using req.user(jwt token) for user and in post_id the user id will be added 
private access
*/

const UnLikePostByPostId= async (req, res) => {
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post Not Found"});
        }
        if(post.likes.filter(likes => likes?.user?.toString()===req.user_id).length===0){
            // toString is used as to convert objectid into String other Object will compare the address and we will get false even if the value matches 
            // Post is not being Liked By user 
            return res.status(400).json({msg:"User Has not liked this Post"});
        }
       
        const removeIdx=post.likes.map(likes => likes?.user?.toString()).indexOf(req.user._id);
        post.likes.splice(removeIdx,1);
        await post.save();
       
        res.status(200).json(post.likes);
    } catch (err) {
        res.status(500).json({message: err});
    }
    }


/*
Post api/posts/comment/:post_id
description:- add comment  using req.user(jwt token) for user and in post_id the user id will be added 
private access
*/

const PostCommentByPostId= async (req,res) =>{
    try{
     const post=await Post.findById(req.params.post_id);
     const user=await User.findById(req.user._id);
     const Comment={
        text:req.body.text,
        name:user.username,
        avatar:user.avatar,
        user:req.user._id
     };
     post.comments.unshift(Comment);
     await post.save();
     res.status(200).json(post.comments);
    }
    catch(err){
        res.status(500).json({message:err+""});
    }
}

/*
Delete api/posts/comment/:post_id/:comment_id
description:- remove comment by using comment id and post_is
private access:-only the one who has write the comment can delete it 
*/

const RemoveCommentByCommentIdAndPostId = async (req,res) => {
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post Not Found"});
        }
        if(post.comments.filter(comments => comments?.user?.toString()===req.user._id).length===0){
            // toString is used as to convert objectid into String other Object will compare the address and we will get false even if the value matches 
            // Post is not being Liked By user 
            // console.log(comments?.user?.toString()+"  "+req.user_id);
            return res.status(400).json({msg:"User Does not have any Comments on this Post"});
        }
       
        const removeIdx=post.comments.map(comments => comments?._id?.toString()).indexOf(req.params.comment_id);
        post.comments.splice(removeIdx,1);
        await post.save();
        res.status(200).json(post.comments);
    } catch (err) {
        res.status(500).json({message: err+""});
    }
}



module.exports = {createPost,GetAllPosts,getPostById,deleteById,LikePostByPostId,UnLikePostByPostId,PostCommentByPostId,RemoveCommentByCommentIdAndPostId};