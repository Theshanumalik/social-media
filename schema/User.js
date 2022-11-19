const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name field cannot be empty'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'name field cannot be empty'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'name field cannot be empty']
    },
    profilePic: {
        type: String,
        default: 'http://localhost:5000/public/userDefault.jpg'
    },
    cover: {
        type: String,
        default: 'http://localhost:5000/public/userDefault.jpg'
    },
}, {timestamp: true});

const User = mongoose.model("user", userSchema);
User.createIndexes();

module.exports = User;