module.exports = {
    onlyDevs: (req, res, next) => {
        if (req.user.emails[0].value == '925shota@gmail.com' || req.user.emails[0].value == 'hibiki.ichihara@vibin.tokyo' || req.user.emails[0].value == 'so.gorman@vibin.tokyo' || req.user.emails[0].value == 'josephmaster1013@gmail.com') {
            return next();
          } else {
            req.flash('error_msg', res.__('msg.error.dev'));
            res.redirect('/dashboard/-1?page=1&limit=15');
          }
    }
}