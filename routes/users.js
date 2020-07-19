const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const passport = require('passport');


const User = require('../models/User');
const Video = require('../models/Video');

router.get('/newsletter', (req, res) => {
    res.render('newsletter', {
        email: req.user._json.email,
        username: req.user.displayName
    })
});

router.post('/newsletter', (req, res) => {
    const { email } = req.body;

    User.findOneAndUpdate({ email: email }, { subscription: true }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard?page=1&limit=15');
        } else {
            const smtp = nodemailer.createTransport({
                service: 'Gmail',
                secure: false,
                auth: {
                    user: "2020.shota.inoue@uwcisak.jp",
                    pass: "Shota0130"
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                to: user.email,
                from: '2020.shota.inoue@uwcisak.jp',
                subject: "Thank you for subscribing!",
                html: `
                    <h1>Today's highlights</h1>
                    `
            };

            smtp.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success_msg', `We've sent ${email} an email!`);
                    res.redirect('/dashboard/-1?page=1&limit=15');
                }
            });
        }
    })
})

module.exports = router;