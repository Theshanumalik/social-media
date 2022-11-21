const Post = require("../schema/Post");
const secureText = require("../utils/secureText");

const createPost = async (req, res) => {
    const {caption, imageUrl} = req.body;
    if(!caption || !imageUrl) {
        return res.status(400).json('all fields are required')
    }
    try {
        const post = await Post.create({
            user: req.user,
            caption: secureText(caption),
            imageUrl
        });
        await post.save()
        res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Enternal server error")
    }
}
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const isLiked = post.likes.includes(req.user);
        if(isLiked) {
             await Post.findByIdAndUpdate(req.params.postId, {
                $pull: {
                    likes: req.user
                }}, {new: true})
                res.json("unliked post successfully")
        }else{
            await Post.findByIdAndUpdate(req.params.postId, {
                $push: {
                    likes: req.user
                }
            }, {new: true})
            res.json("liked post successfully")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Enternal server error")
    }
}

module.exports = {createPost, likePost}