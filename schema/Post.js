const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    caption: {
        type: String
    },
    imageUrl: {
        type: String
    },
    likes: {
        type: Array
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {timestamps: true})

const Post = mongoose.model("post", postSchema);

module.exports = Post;