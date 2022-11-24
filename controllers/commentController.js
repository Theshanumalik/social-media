const Post = require("../schema/Post");
const secureText = require("../utils/secureText");

const writeComment = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if(!post) {
        return res.status(404).json("Post Not Found");
    }
    await Post.findByIdAndUpdate(req.params.postId, {
        $push: {
            comments: {
                user: req.user,
                message: secureText(req.body.message)
            }
        }
    })
    res.json(post)
}

module.exports = {writeComment}