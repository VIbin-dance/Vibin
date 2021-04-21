const express = require('express');
const router = express.Router();
const moment = require('moment');
const { ensureAuthenticated } = require('../config/auth');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const User = require('../models/User');
const Lesson = require('../models/Lesson');

findLesson  =  function (id) { 
    return Lesson.find({ choreographerID: id}).lean()
}

findTicket = function(id) {
    return Lesson.find({ _id: id }).lean()
}

router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

router.get('/preference', ensureAuthenticated, (req, res) => {
    res.render('preference', {
        userPhoto: req.session.user.userPhoto,
        userPhotoDef: req.session.user.userPhotoDef,
    })
})
// not yet
router.post('/preference', ensureAuthenticated, async(req, res) => {
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
                errors,
                userPhoto: user.userPhoto,
                userPhotoDef: user.userPhotoDef,
                level,
                purpose
            });
        } else {
            req.flash('success_msg', res.__('msg.success.tags'));
            res.redirect('/dashboard/-1?page=1&limit=15');
        }
    })
})

router.get('/profile', ensureAuthenticated, async (req, res) => {
    const [lesson, tickets] = await Promise.all([findLesson(req.session.user.googleId), findTicket(req.session.user.lesson)]); 
    const choreographer = [];

    for (let i=0; i<req.session.user.lesson.length;i++) {
        choreographer[i] = await User.findOne({ googleId: tickets[i].choreographerID }, 'username').lean().exec();
    }

    res.render('profile', {
        user: req.session.user,
        bio: req.session.user.bio,
        userPhoto: req.session.user.userPhoto,
        userPhotoDef: req.session.user.userPhotoDef,
        lesson: lesson,
        tickets: tickets,
        choreographer: choreographer,
        moment: moment,
    })
})

router.get('/profile/edit', ensureAuthenticated, (req, res) => {
    if (!req.session.user) {
        req.flash('error_msg', res.__('msg.error.noUser'));
        res.redirect('/dashboard/-1?page=1&limit=15');
    } else {
        res.render('profileEdit', {
            user: req.session.user,
            bio: req.session.user.bio,
            userPhoto: req.session.user.userPhoto,
            userPhotoDef: req.session.user.userPhotoDef,
            email: req.session.user.email,
            username: req.session.user.username
            })
        }
})

router.post('/profile/edit', ensureAuthenticated, upload.single('userPhotoDef'), async(req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();

    const { username, bio, level, purpose, genre } = req.body;
    let userPhotoDef = {};
    let query = {};
    let errors = [];

    if (req.file != undefined) {
        const buffer = await sharp(req.file.buffer).resize(300, 300).toBuffer()
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
            errors,
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
            email: user.email,
            user,
            username,
            curUsername: user.username,
            bio,
            level,
            purpose,
            genre
        });
    } else {
        await User.findOneAndUpdate({ email: req.user._json.email }, query).exec()
        const user = await User.findOne({ email: req.user._json.email }).exec();
        req.session.user = user
        req.flash('success_msg', res.__('msg.success.profile'));
        res.redirect('/users/profile');
    }
})

module.exports = router;