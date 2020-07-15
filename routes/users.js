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

    User.findOne({ email: email }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard?page=1&limit=15');
        } else {
            Video.find({ language: 'en' }, (err, result) => {
                const smtp = nodemailer.createTransport({
                    service: 'Gmail',
                    secure: false,
                    auth: {
                        user: "Vibin'",
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
                    <h1>Today's highlights</h1><h2>${result[0].title}</h2><a href="https://www.vibin.tokyo/player/${result[0].id}"><img src="${result[0].thumbnail}"></a>
                    <h2>${result[1].title}</h2><a href="https://www.vibin.tokyo/player/${result[1].id}"><img src="${result[1].thumbnail}"></a>
                    <h2>${result[2].title}</h2><a href="https://www.vibin.tokyo/player/${result[2].id}"><img src="${result[2].thumbnail}"></a>
                    `
                };

                smtp.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash('success_msg', `We've sent ${email} an email!`);
                        res.redirect('/dashboard?page=1&limit=15');
                    }
                });
            }).limit(3)
        }
    })
})

module.exports = router;