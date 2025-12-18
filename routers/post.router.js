const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const authJWT = require('../Middleware/authJWT.middleware');

//http://localhost:5001/api/v1/post
router.post("", authJWT.verifyToken,PostController.createPost);

//http://localhost:5001/api/v1/post
router.get("", PostController.getAllPost);

//http://localhost:5001/api/v1/post/1
router.get("/:id", PostController.getById);

//http://localhost:5001/api/v1/post
router.get("/author/:id", PostController.getByAuthorId);

 //http://localhost:5001/api/v1/post/1
router.put("/:id", authJWT.verifyToken, PostController.upDatePost);

 //http://localhost:5001/api/v1/post/1
router.delete("/:id", authJWT.verifyToken, PostController.deletePost);

module.exports = router;