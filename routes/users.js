const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');

const User = require('../models/User');
const Video = require('../models/Video');

router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

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

router.get('/profile', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user._json.email }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard/-1?page=1&limit=15');
        } else {
            res.render('profile', {
                followingCount: user.following.length,
                followerCount: user.follower.length,
                bio: user.bio,
                userPhoto: req.session.passport.user.photos[0].value,
                email: user.email,
                firstName: user.name.givenName,
                lastName: user.name.familyName,
                username: user.username
            })
        }
    })
})

router.get('/profile/edit', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user._json.email }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard/-1?page=1&limit=15');
        } else {
            res.render('profileEdit', {
                followingCount: user.following.length,
                followerCount: user.follower.length,
                bio: user.bio,
                userPhoto: req.session.passport.user.photos[0].value,
                email: user.email,
                firstName: user.name.givenName,
                lastName: user.name.familyName,
                username: user.username
            })
        }
    })
})

router.post('/profile/edit', ensureAuthenticated, (req, res) => {
    const { email, username, bio } = req.body;
    let errors = [];

    console.log(req.body);

    const query = {
        $set: {
            username: username,
            bio: bio
        }
    }

    User.findOneAndUpdate({ email: req.user._json.email }, query, (err, user) => {

        if (!user) {
            errors.push({ msg: 'There is no such user' });
        }

        if (username == '') {
            errors.push({ msg: 'Please fill in username' });
        }

        if (errors.length > 0) {
            res.render('profile', { errors, userPhoto: req.session.passport.user.photos[0].value, email, username, bio });
        }
        else {
            req.flash('success_msg', 'Your profile has been updated!');
            res.redirect('/users/profile');
        }
    })
})

router.get('/:id', ensureAuthenticated, (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        User.findOne({ email: req.user._json.email }, (err, currentUser) => {
            if (!user) {
                req.flash('error_msg', 'There is no such user');
                res.redirect('/dashboard/-1?page=1&limit=15');
            } else {
                res.render('users', {
                    user: user,
                    currentUser: currentUser,
                    followingCount: user.following.length,
                    followerCount: user.follower.length,
                    bio: user.bio,
                    following: user._id,
                    follower: currentUser._id,
                    userPhoto: req.session.passport.user.photos[0].value,
                    firstName: user.name.givenName,
                    lastName: user.name.familyName,
                    username: user.username
                });
            }
        })
    })
})

router.post('/:id', ensureAuthenticated, (req, res) => {
    const { following, follower, action } = req.body;

    try {
        if (action == 'follow') {
            User.findByIdAndUpdate(follower, { $push: { following: [following] } }).exec();
            User.findByIdAndUpdate(following, { $push: { follower: [follower] } }).exec()
                .then(function (user) {
                    req.flash('success_msg', 'Followed');
                    res.redirect(`/users/${user._id}`);
                })
                .catch(err => console.log(err));
        } else if (action == 'unfollow') {
            User.findByIdAndUpdate(follower, { $pull: { following: following } }).exec();
            User.findByIdAndUpdate(following, { $pull: { follower: follower } }).exec()
                .then(function (user) {
                    req.flash('success_msg', 'Unfollowed');
                    res.redirect(`/users/${user._id}`);
                })
                .catch(err => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;