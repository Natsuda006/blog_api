const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');


//http://localhost:5001/api/v1/users/Post
router.post("", PostController.createPost);


//http://localhost:5001/api/v1/users/Post
router.get("", PostController.getAllPost);

//http://localhost:5001/api/v1/users/Post
router.get("/:id", PostController.getById);

//http://localhost:5001/api/v1/users/Post
router.get("/author/:id", PostController.getByAuthorId);

//http://localhost:5001/api/v1/users/Post
router.put("/:id", PostController.updatePost);

//http://localhost:5001/api/v1/users/Post
router.delete("/:id", PostController.deletePost);