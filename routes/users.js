const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { ensureAuthenticated } = require('../config/auth');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

const User = require('../models/User');
const Video = require('../models/Video');

router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// router.get('/newsletter', (req, res) => {
//     res.render('newsletter', {
//         email: req.user._json.email,
//         username: req.user.displayName
//     })
// });

// router.post('/newsletter', (req, res) => {
//     const { email } = req.body;

//     User.findOneAndUpdate({ email: email }, { subscription: true }, (err, user) => {
//         if (!user) {
//             req.flash('error_msg', 'There is no such user');
//             res.redirect('/dashboard?page=1&limit=15');
//         } else {
//             const smtp = nodemailer.createTransport({
//                 service: 'Gmail',
//                 secure: false,
//                 auth: {
//                     user: "2020.shota.inoue@uwcisak.jp",
//                     pass: "Shota0130"
//                 },
//                 tls: {
//                     rejectUnauthorized: false
//                 }
//             });

//             const mailOptions = {
//                 to: user.email,
//                 from: '2020.shota.inoue@uwcisak.jp',
//                 subject: "Thank you for subscribing!",
//                 html: `
//                     <h1>Today's highlights</h1>
//                     `
//             };

//             smtp.sendMail(mailOptions, (err, response) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     req.flash('success_msg', `We've sent ${email} an email!`);
//                     res.redirect('/dashboard/-1?page=1&limit=15');
//                 }
//             });
//         }
//     })
// })

router.get('/preference', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user._json.email }, (err, user) => {
        res.render('preference', {
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
        })
    })
});

router.post('/preference', ensureAuthenticated, async (req, res) => {
    const { level, purpose, genre } = req.body;
    let errors = [];

    const query = {
        tags: {
            level: level,
            purpose: purpose,
            genre: genre
        }
    }

    User.findOneAndUpdate({ email: req.user._json.email }, query, (err, user) => {

        if (!user) {
            errors.push({ msg: res.__('msg.error.noUser') });
        }

        if (errors.length > 0) {
            res.render('preference', {
                errors, userPhoto: user.userPhoto, userPhotoDef: user.userPhotoDef, level, purpose
            });
        }
        else {
            req.flash('success_msg', res.__('msg.success.tags'));
            res.redirect('/dashboard/-1?page=1&limit=15');
        }
    })
})

router.get('/profile', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user._json.email }, async (err, user) => {

        const likedVid = await Video.find({ 'like.id': user._id.toString() }).exec()

        if (!user) {
            req.flash('error_msg', res.__('msg.error.noUser'));
            res.redirect('/dashboard/-1?page=1&limit=15');
        } else {
            res.render('profile', {
                likedVid: likedVid,
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
            req.flash('error_msg', res.__('msg.error.noUser'));
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

router.post('/profile/edit', ensureAuthenticated, upload.single('userPhotoDef'), async (req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();

    const { username, bio, level, purpose, genre } = req.body;
    let userPhotoDef = {};
    let query = {};
    let errors = [];


    if (req.file != undefined) {
        const buffer = await sharp(req.file.buffer).resize(500, 500).toBuffer()
        userPhotoDef = {
            data: buffer,
            originalname: req.file.originalname,
            contentType: req.file.mimetype
        };

        query = {
            $set: {
                userPhotoDef: userPhotoDef,
                username: username,
                bio: bio,
                tags: { level: level, purpose: purpose, genre: genre },
            }
        }
    } else if (req.file == undefined) {
        query = {
            $set: {
                username: username,
                bio: bio,
                tags: { level: level, purpose: purpose, genre: genre },
            }
        }
    }

    if (req.file != undefined && req.file.size > 307200) {
        errors.push({ msg: res.__('msg.error.size') });
    }

    if (!user) {
        errors.push({ msg: res.__('msg.error.noUser') });
    }

    if (username == '') {
        errors.push({ msg: res.__('msg.error.username') });
    }

    if (errors.length > 0) {
        res.render('profileEdit', {
            errors, userPhoto: user.userPhoto, userPhotoDef: user.userPhotoDef, email: user.email, user, username, bio, level, purpose, genre
        });
    } else {
        User.findOneAndUpdate({ email: req.user._json.email }, query, (err, user) => {
            req.flash('success_msg', res.__('msg.success.profile'));
            res.redirect('/users/profile');
        })
    }

})

router.get('/:id', ensureAuthenticated, (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        User.findOne({ email: req.user._json.email }, async (err, currentUser) => {

            const likedVid = await Video.find({ 'like.id': user._id.toString() }).exec()

            if (!user) {
                req.flash('error_msg', res.__('msg.error.noUser'));
                res.redirect('/dashboard/-1?page=1&limit=15');
            } else {
                res.render('users', {
                    likedVid: likedVid,
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
                    req.flash('success_msg', res.__('msg.success.followed'));
                    res.redirect(`/users/${user._id}`);
                })
                .catch(err => console.log(err));
        } else if (action == 'unfollow') {
            User.findByIdAndUpdate(follower, { $pull: { following: following } }).exec();
            User.findByIdAndUpdate(following, { $pull: { follower: follower } }).exec()
                .then(function (user) {
                    req.flash('success_msg', res.__('msg.success.unfollowed'));
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
            req.flash('error_msg', res.__('msg.error.noUser'));
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