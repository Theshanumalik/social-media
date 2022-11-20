const createPost = async (req, res) => {
    const {caption, imageUrl} = req.body;
    
    res.json({caption, imageUrl})
}

module.exports = {createPost}