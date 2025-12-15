const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET ;

exports.register = async (req, res) => {
const { username, password } = req.body;
if (!username || !password) {
    return res.status(400).send({ message: "Please provide username and password" });
}

const existingUser = await UserModel.findOne({ username });
if (existingUser) {
    return res.status(400).send({ message: "Username  is already used" });
}
try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await new UserModel({
        username,
        password: hashedPassword,
    });
    await user.save();
    res.send({ message: "User registered successfully" });
} catch (error) {
    res.status(500).send({ message:  error.message || "Someting occurred while registering a new user" });
}
};

exports.login = async (req, res) => {
    //1. check username and password 
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Please provide username and password" 
        });
    }
    //2. username is exist?
    try {
        const userDoc = await UserModel.findOne({ username });
        if (!userDoc) {
            return res.status(404).send({ message: "User not found" });
        }
     //3.compare password
         const isPasswordMatched = await bcrypt.compare(password, userDoc.password);
            if (!isPasswordMatched) {
                return res.status(401).send({ message: "Invalid credentials" });
            }
    // 4. generate token (jwt)
            jwt.sign({username, id:userDoc._id },secret,{}, (err, token)=> {
                if(err){
                    res.status(500).send({ message: "Internal Serve Error: Authentication failed!" });
                }
                res.send({ message: "Login successful", accessToken: token });
            });
} catch (error) {
    res.status(500).send({ message:  error.message || "Someting occurred while registering a new user" });
}
};