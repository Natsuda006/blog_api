const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

//http://localhost:5001/api/v1/users/register
router.post("/register", UserController.register);

//http://localhost:5001/api/v1/users/login
router.post("/login", UserController.login);


module.exports = router;

