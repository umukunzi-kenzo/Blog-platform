const { applyTimestamps } = require("./Users");

 const mongoose = require(mongoose);

 const postSchema = new mongoose.schema(
  {
    //title of the post is required
    title: {
        type: String,
        required: true,
     },
     
     //content of the post required
     content: {
        type: String,
        required: true,
      },

      // reference to the one who create it 
      author: {
        type:mongoose.Schema.Types.ObjectId, // this is stores the user id
        required: true,
        ref: "User", // refers to the user model allows population later
      },

  },

  {
    timestamps: true, 
  },

 );

 // creat the post model from the schema
 const Post = mongoose.model("Post", postSchema);

 //export the model so it can be used in controllers/route
 module.exports = Post;