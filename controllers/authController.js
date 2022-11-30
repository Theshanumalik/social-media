const { validationResult } = require("express-validator");
const User = require("../schema/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/globalVariables");
const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json("Incorrect email or password")
        }
        const isCorrectPass = await bcrypt.compare(password, user.password);
        if(!isCorrectPass) {
            console.log("hello")
            return res.status(401).json("Incorrect email or password")
        }
        // Creating access token
        const token = jwt.sign({
            id: user._id
        }, secretKey);

        // Sending access-token and user data
        const {password: Upassword, ...others} = user._doc
        res.cookie("access-token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        }).json(others)

    } catch (error) {
        res.status(500).json("Enternal server error");
        console.log(error);
    }
}
const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json(errors);
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(401).json("user aleardy exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            email: req.body.email,
            password: hashPass,
            name: req.body.name
        });
         // Creating access token
         const token = jwt.sign({
            id: user._id
        }, secretKey);

        res.cookie("access-token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        }).json(user)
    } catch (error) {
        res.status(500).json("Enternal server error");
        console.log(error);
    }
}

const logout = async (req, res) => {
    res.clearCookie("access-token").json("user logged out successfully")
}

module.exports = {login, register, logout}