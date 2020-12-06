module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error_msg', res.__('msg.error.auth'));
            res.redirect('/');
        }
    }
}