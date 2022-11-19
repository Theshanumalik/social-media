const { validationResult } = require("express-validator");
const User = require("../schema/User");
const bcrypt = require('bcryptjs')

const login = (req, res) => {
    res.json("hello")
}
const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json(errors)
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
        res.json(hashPass);
    } catch (error) {
        res.status(500).json("Enternal server error")
        console.log(error)
    }
}

module.exports = {login, register}