const express = require('express');
const { createPost, likePost, getUserAllPost } = require('../controllers/postControllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { getTrimedValue } = require('../utils/getSafeValue');
const router = express.Router();
router.use(isAuthenticated)
router.post("/create", getTrimedValue, createPost)
router.put('/like/:postId', likePost)
router.get('/:userId', getUserAllPost)
module.exports = router