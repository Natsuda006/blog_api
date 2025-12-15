const PostModel = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, cover, content, summary, author } = req.body;
    if (!title || !cover || !content || !summary || !author) {
        return res.status(400).send({ message: "Please provide all fields" });
    }
    try {
        const existingPost = await PostModel.findOne({ title });
        if (existingPost) {
            return res.status(400).send({ message: "Post title is already used" });
        }
    const postDoc = await PostModel.create({
        title,
        cover,
        content,
        summary,
        author,
    });
   if (!postDoc) {
    return res.status(404).send({ message: "Failed to create post" });
   }
   res.send({ message: "Post created successfully", data:postDoc });
}catch (error) {
    res.status(500).send({ message:  error.message || "Someting occurred while creating a new post" });
}
};

exports.getAllPost = async (req, res) => {
    try {
        const posts = (await PostModel.find().populate("author", ["username"])).sort({ createdAt: -1 }).limit(20);
        if (!posts) {
            return res.status(404).send({ message: "No posts found" });
        }
       res.send(posts);
    } catch (error) {
        res.status(500).send({ message:  error.message || "Someting occurred while fetching posts" });
    }
};
// exports.getAllPosts = async (req, res) => {
//     try {
//         const posts = await PostModel.findAll().populate('author', 'username');
//         res.status(200).json(posts);
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         res.status(500).json({ message: "Internal server error.", error: error.message });
//     }
  
// }
// exports.getPostById = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const post = await PostModel.findById(postId).populate('author', 'username');   
//         if (!post) {
//             return res.status(404).json({ message: "Post not found." });
//         }
//         res.status(200).json(post);
//     } catch (error) {
//         console.error("Error fetching post by ID:", error);
//         res.status(500).json({ message: "Internal server error.", error: error.message });
//     }
 
// }
// exports.getPostsByAuthor = async (req, res) => {
//    try {
//         const authorId = req.params.authorId;
//         const posts = await PostModel.find({ author: authorId }).populate('author', 'username');
//         res.status(200).json(posts);
//     } catch (error) {
//         console.error("Error fetching posts by author:", error);
//         res.status(500).json({ message: "Internal server error.", error: error.message });
//     }
// }
// exports.updatePost = async (req, res) => {
//  try {
//     const postId = req.params.id;
//     const { title, cover, content, summary,author } = req.body;
//     const updatedPost = await PostModel.findByIdAndUpdate(
//         postId,
//         { title, cover, content, summary, author },
//         { new: true }
//     ).populate('author', 'username');
//     if (!updatedPost) {
//         return res.status(404).json({ message: "Post not found." });
//     }
//     res.status(200).json(updatedPost);
//  } catch (error) {
//     console.error("Error updating post:", error);
//     res.status(500).json({ message: "Internal server error.", error: error.message });
//  }
// }
// exports.deletePost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const deletedPost = await PostModel.findByIdAndDelete(postId);
//         if (!deletedPost) {
//             return res.status(404).json({ message: "Post not found." });
//         }
//         res.status(200).json({ message: "Post deleted successfully." });
//     } catch (error) {
//         console.error("Error deleting post:", error);
//         res.status(500).json({ message: "Internal server error.", error: error.message });
//     }
// }