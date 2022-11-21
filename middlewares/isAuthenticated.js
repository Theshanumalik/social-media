const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/globalVariables');
module.exports = function isAuthenticated(req, res, next) {
    const token = req.cookies['access-token'];
    if(!token) {
        return res.json("User is unauthrized").status(403)
    }
    try {
        const {id} = jwt.verify(token, secretKey);
        if(!id) {
            return res.json("User is unauthrized").status(403)
        }
        req.user = id;
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json("Enternal server error")
    }
}