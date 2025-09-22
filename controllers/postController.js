const Post = require("../models/Post");

// create new post
//========================

const createPost = async (req, res)=> {
    try {
       // extrct title and content from request body
       const{ title, content } = req.body;
         
       // create new post in database
       // 'author' comes from req.user, which is set by auth middleware
       const post = await Post.create({
        title,
        content,
        author: req.user._id, // automatically links post to the logged in user

       });

       // send the created post as a response
       res.status(201).json(post);

    } catch (error) {
  // to catch any errors
  res.status(500).json({message: error.message});      
    }
};

//====================


//get all post
const getPosts = async (req, res) =>{
    try {
        // fetch all post and populate the author's username and email
        const posts = await Post.find().populate("author", "username email");

        //sends posts as json response
        res.status(200).json(posts);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//=================


//get a single post by id
//=====================


const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username email");

        if(!post){
            res.status(404).json({ message: "Post not found"});

        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
 
    }
}

//==============        


//Update a post (only the auther can)
//=============

const updatePost = async (req, res) => {
    try {
        const post = await post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({ message: "Post not found" });
        }

        // to check if loged in user is the author
        if(!post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }
        // update title and content if provided
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        // save updated post
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);


      } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//======================

// delete post(by author or admin)
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ message: "Post not found" });
        }
        // only author or admin can delete
        if(post.author.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            res.status(403).json({ message: " You are not authorized to delete this post" });
       }

       await post.remove();
       res.status(200).json({ message: "Post deleted successfully "});


    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };