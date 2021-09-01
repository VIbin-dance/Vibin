module.exports = {
    checkSession: (req, res, next) => {
        if (!req.isAuthenticated() && !req.session.user) {
            user = "";
            return next();
        } else {
            user = req.session.user
            return next();
        }
    }
}