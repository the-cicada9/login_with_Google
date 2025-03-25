const Posts  = require("../models/Posts")

const savePost = async(req , res) => {
    try{
        // console.log(req, ">>>req");
        
        const {content , image , tags} = req.body;
        console.log(content , image , tags , ">>>");

        const {userId , email} = req.user;
        console.log(userId , email , ">><<<");
        
        
        const post = await Posts.create({
            user: userId,
            content,
            image,
            tags
        });
        console.log(post , ">>>posts");
        
        res.status(200).json({success : true , post})
    }catch(err){
        console.log(err);
        res.status(500).json({success : false , err})
    }
}

const getAllPosts = async(req , res) => {
    try{
        const posts = await Posts.find().populate("user");
        console.log(posts , ">>>allPosts");
        
        res.status(200).json({success : true , posts})
    }catch(err){
        res.status(500).json({success : false , err})
    }
}

const likeUnlikePost = async(req , res) => {
    try{
        console.log(req , ">>>req.body");
        
        const {postId} = req.body;
        console.log(postId , ">>//postId");
        
        const post = await Posts.findById(postId);

        if(!post){
            return res.status(404).json({success : false , message : "Post not found"})
        }
        if(post.likes.includes(req.user.userId)){
            post.likes = post.likes.filter((id) => id.toString() !== req.user.userId.toString());
        }else{
            post.likes.push(req.user.userId);
        }
        await post.save();

        res.status(200).json({success : true , post})
    }catch(err){
        res.status(500).json({success : false , err})
    }
}

module.exports = { savePost, getAllPosts, likeUnlikePost };
