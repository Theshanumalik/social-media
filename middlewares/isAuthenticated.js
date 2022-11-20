module.exports = function isAuthenticated(req, res, next) {
    res.json(req.cookies)
}