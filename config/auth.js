module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated() && req.session.user) {
            return next();
        } else {
            req.flash('error_msg', res.__('msg.error.auth'));
            res.redirect('/');
        }
    }
}