const express = require('express');
const router = express.Router();
const {login, register, logout} = require('../controllers/authController')
const {body} = require('express-validator');
const {getTrimedValue} = require('../utils/getSafeValue');

router.post('/login', login);
router.post('/register', getTrimedValue,
    body('email').isEmail(),
    body('password').isLength({ min: 5 }), register)
router.post('/logout', logout)


module.exports = router