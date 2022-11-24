const express = require('express');
const { writeComment } = require('../controllers/commentController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { getTrimedValue } = require('../utils/getSafeValue');
const router = express.Router();
router.use(isAuthenticated)
router.post('/add/:postId', getTrimedValue, writeComment)
module.exports = router