module.exports = {
    onlyDevs: (req, res, next) => {
        if (req.user.emails[0].value == '925shota@gmail.com' || req.user.emails[0].value == 'hibiki.ichihara@vibin.tokyo' || req.user.emails[0].value == 'so.gorman@vibin.tokyo') {
            return next();
          } else {
            req.flash('error_msg', "Sorry this is not yet available to users!");
            res.redirect('/dashboard?page=1&limit=15');
          }
    }
}