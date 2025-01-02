const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
//  register a user
//  @route   POST /api/users/register
// access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await userModel.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exist");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    console.log(hashPassword);
    const user = await userModel.create({
        username,email,password:hashPassword,
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" })
});
// /login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password required");
    }
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET
        ,{expiresIn:"15m"}
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ message: "Data do not match" })
        throw new Error("email or password is not valid");
    }
    res.json({ message: "Login user" })
});
//  /current
// private method
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
    // res.json({ message: "Current user" })
});
module.exports = { registerUser,loginUser,currentUser };