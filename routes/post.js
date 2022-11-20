const express = require('express');
const { createPost } = require('../controllers/postControllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

router.post("/create", isAuthenticated,createPost)

module.exports = router