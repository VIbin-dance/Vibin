const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

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
                user: user,
                followingCount: user.following.length,
                followerCount: user.follower.length,
                bio: user.bio,
                userPhoto: user.userPhoto,
                userPhotoDef: user.userPhotoDef,
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
                user: user,
                followingCount: user.following.length,
                followerCount: user.follower.length,
                bio: user.bio,
                userPhoto: user.userPhoto,
                userPhotoDef: user.userPhotoDef,
                email: user.email,
                firstName: user.name.givenName,
                lastName: user.name.familyName,
                username: user.username
            })
        }
    })
})

router.post('/profile/edit', ensureAuthenticated, upload.single('userPhotoDef'), (req, res) => {
    const { username, bio } = req.body;
    let userPhotoDef = {};
    let query = {};
    let errors = [];

    if (req.file != undefined) {
        userPhotoDef = {
            data: req.file.buffer,
            originalname: req.file.originalname,
            contentType: req.file.mimetype
        };

        query = {
            $set: {
                userPhotoDef: userPhotoDef,
                username: username,
                bio: bio
            }
        }
    } else if (req.file == undefined) {
        query = {
            $set: {
                username: username,
                bio: bio
            }
        }
    }

    if (req.file != undefined && req.file.size > 307200) {
        req.flash('error_msg', 'The photo needs to be smaller than 3MB');
        res.redirect('/users/profile/edit');
    } else {
        User.findOneAndUpdate({ email: req.user._json.email }, query, (err, user) => {

            if (!user) {
                errors.push({ msg: 'There is no such user' });
            }

            if (username == '') {
                errors.push({ msg: 'Please fill in username' });
            }

            if (errors.length > 0) {
                res.render('profile', {
                    errors, userPhoto, userPhotoDef, email, username, bio
                });
            }
            else {
                req.flash('success_msg', 'Your profile has been updated!');
                res.redirect('/users/profile');
            }
        })
    }
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
                    userPhoto: currentUser.userPhoto,
                    userPhotoDef: currentUser.userPhotoDef,
                    proPhoto: user.userPhoto,
                    proPhotoDef: user.userPhotoDef,
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

router.get('/:type/:id', ensureAuthenticated, (req, res) => {
    User.findOne({ _id: req.params.id }, async (err, user) => {

        const currentUser = await User.findOne({ email: req.user._json.email }).exec();

        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard/-1?page=1&limit=15');
        }

        if (req.params.type == 'following') {
            const following = [];

            for (let i = 0; i < user.following.length; i++) {
                following[i] = await User.findById(user.following[i], 'username').exec();
            }

            const currentUser = await User.findOne({ email: req.user._json.email }).exec();

            res.render('follow', {
                follow: following,
                type: req.params.type,
                userPhoto: currentUser.userPhoto,
                userPhotoDef: currentUser.userPhotoDef,
                followCount: user.following.length,
                username: user.username
            });
        } else if (err) {
            console.log(err);
        }

        if (req.params.type == 'follower') {
            const follower = [];

            for (let i = 0; i < user.follower.length; i++) {
                follower[i] = await User.findById(user.follower[i], 'username').exec();
            }

            res.render('follow', {
                follow: follower,
                type: req.params.type,
                userPhoto: currentUser.userPhoto,
                userPhotoDef: currentUser.userPhotoDef,
                followCount: user.follower.length,
                username: user.username
            });
        } else if (err) {
            console.log(err);
        }
    })
})

module.exports = router;