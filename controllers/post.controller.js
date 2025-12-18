const PostModel = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, cover, content, summary } = req.body;
    const authorId = req.authorId;
  if (!title || !cover || !content || !summary ) {
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
      author: authorId,
    });
    if (!postDoc) {
      return res.status(404).send({ message: "Failed to create post" });
    }
    res.send({ message: "Post created successfully", data: postDoc });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Someting occurred while creating a new post",
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20);

    if (!posts) {
      return res.status(404).send({ message: "No posts found" });
    }
    res.send(posts);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Someting occurred while fetching posts",
    });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "Post ID is required" });
  }
  try {
    const post = await PostModel.findById(id)
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.send(post);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Someting occurred while fetching the post",
    });
  }
};

exports.getByAuthorId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "Post ID is missing" });
  }
  try {
    const posts = await PostModel.find({ author: id })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20);
    if (!posts) {
      return res
        .status(404)
        .send({ message: "No posts found for this author" });
    }
    res.send(posts);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Someting occurred while fetching posts by author",
    });
  }
};

exports.upDatePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.authorId;
  if (!id) {
    return res.status(400).send({ message: "Post ID is missing" });
  }

  const { title, cover, content, summary } = req.body;
  if (!title || !cover || !content || !summary ) {
    return res.status(400).send({ message: "Please provide all fields" });
  }
  try {
    const postDoc = await PostModel.findOne({ _id: id, author: authorId });
    if (!postDoc) {
      return res.status(404).send({ message: "Post not found " });
    }
    if (postDoc.length === 0) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this post" });
    } else {
      //      postDoc.title = title;
      //  postDoc.cover = cover;
      //  postDoc.content = content;
      //  postDoc.summary = summary;
      //  await postDoc.save();
      const newPost = await PostModel.findByIdAndUpdate(
        { author: authorId, _id: id },
        { title, cover, content, summary },
        {
          new: true,
        }
      );
      if (!newPost) {
        return res.status(500).send({ message: "Cannot update this post " });
      }
      res.send({ message: "Post updated successfully", data: postDoc });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Someting occurred while updating the post",
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.authorId;
  if (!id) {
    return res.status(400).send({ message: "Post ID is missing" });
  }
//   if (!authorId) {
//     return res.status(400).send({ message: "Author Id is missing" });
//   }

  try {
    const postDoc = await PostModel.findOneAndDelete({ author:authorId, _id: id });
    if (!postDoc) {
      return res.status(500).send({ message: "Cannot delete this post " });
    }
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Someting occurred while deleting the post",
    });
  }
};

