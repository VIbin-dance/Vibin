var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const passport = require('passport');
const moment = require('moment');
const { ensureAuthenticated } = require('../config/auth');
const { createChannel, getRecording, deleteChannel } = require('../config/aws/channel');

const User = require('../models/User');
const Video = require('../models/Video');
const Channel = require('../models/Channel');
const Schedule = require('../models/Schedule');
const Lesson = require('../models/Lesson');


// Routes
router.get('/', (req, res) => {
    res.render('/', { title: 'Student' });
});

router.get('/channel', ensureAuthenticated, async (req, res) => {
    let ch_count;
    // let currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // let videoCHK = currentUrl.search("aaa");
    User.findOne({ email: req.user._json.email }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard?page=1&limit=15');
        } else {
            let ch_name = "";
            let ch_latency = "";
            let ch_type = "";
            let ch_arn = "";
            Channel.findOne({ googleId: req.user.id }, (err, ch) => {
                if (!ch) {
                    req.flash('error_msg', '現在所有しているチャンネルがありません。');
                    ch_count = 0;
                    ch_name = '';
                    ch_latency = '';
                    ch_type = '';
                    ch_arn = '';
                    ch_ingest = '';
                    ch_streamkey = '';
                } else {
                    ch_count = 1;
                    ch_name = ch.ch_name;
                    ch_latency = ch.latencyMode;
                    ch_type = ch.type;
                    ch_arn = ch.arn;
                    ch_ingest = ch.ingestEndpoint;
                    ch_streamkey = ch.streamKey.value;
                }
                res.render('channel', {
                    userPhoto: req.session.user.userPhoto,
                    userPhotoDef: req.session.user.userPhotoDef,
                    email: req.session.user.email,
                    firstName: req.session.user.name.givenName,
                    lastName: req.session.user.name.familyName,
                    username: req.session.user.username,
                    count: ch_count,
                    ch_name: ch_name,
                    ch_latency: ch_latency,
                    ch_type: ch_type,
                    ch_arn: ch_arn,
                    ch_ingest: "rtmps://" + ch_ingest + ":443/app/",
                    ch_streamkey: ch_streamkey
                })
            })

        }
    })
});

router.post('/create_channel', ensureAuthenticated, async (req, res) => {
    const { ch_name } = req.body;
    createChannel(req, res, ch_name);
    res.redirect("/lesson/channel");
});

router.post('/delete_channel', ensureAuthenticated, function (req, res) {
    deleteChannel(req, res);
});

router.get('/teacher/:lesson_id', ensureAuthenticated, async (req, res) => {
    const ls = await Lesson.findOne({ _id: req.params.lesson_id }).lean().exec();
    if (ls.choreographerID === req.session.user.googleId) {
        Channel.findOne({ googleId: req.user.id }, (err, ch) => {
            if (!ch) {
                req.flash('error_msg', '現在所有しているチャンネルがありません。');
                res.redirect('/lesson/channel');
            } else {
                ch_count = 1;
                // let url;

                if (moment().isAfter(ls.time)) {
                    console.log('iz after bitch')
                    // url = 
                    getRecording(req, res)
                } else {
                    url = ch.playbackUrl
                }

                res.render('teacher', {
                    userPhoto: req.session.user.userPhoto,
                    userPhotoDef: req.session.user.userPhotoDef,
                    email: req.session.req.user._json.email,
                    username: req.session.user.username,
                    count: ch_count,
                    ch_name: ls.title,
                    ch_latency: ch.latencyMode,
                    ch_type: ch.type,
                    ch_arn: ch.arn,
                    ch_ingest: "rtmps://" + ch.ingestEndpoint + ":443/app/",
                    ch_streamkey: ch.streamKey.value,
                    ch_playURL: ch.playbackUrl
                })
            }
        });
    } else {
        req.flash('error_msg', 'アカウント情報が正しくありません。');
        res.redirect('/users/profile');
    }
});

router.get('/student/:lesson_id', ensureAuthenticated, async (req, res) => {
    Lesson.findOne({ _id: req.params.lesson_id }, (err, ls) => {
        if (!ls) {
            req.flash('error_msg', '選択したレッスンの期限が切れたか情報が正しくありません。');
            res.redirect('/users/profile');
        } else if (!req.session.user.lesson.includes(ls._id.toString())) {
            req.flash('error_msg', '選択したレッスンは購入されていません');
            res.redirect(`/reservation/${req.params.lesson_id}`);
        } else {
            Channel.findOne({ googleId: ls.choreographerID }, async (err, ch) => {
                if (!ch) {
                    req.flash('error_msg', '現在所有しているチャンネルがありません。');
                    res.redirect('/users/profile');
                } else {
                    const choreographer = await User.findOne({ googleId: ls.choreographerID }).lean().exec();
                    ch_count = 1;
                    res.render('student', {
                        userPhoto: req.session.user.userPhoto,
                        userPhotoDef: req.session.user.userPhotoDef,
                        email: req.session.email,
                        username: req.session.user.username,
                        choreographer: choreographer,
                        teacherPhoto: choreographer.userPhoto,
                        teacherPhotoDef: choreographer.userPhotoDef,
                        lesson: ls,
                        count: ch_count,
                        ch_name: ls.title,
                        ch_arn: ch.arn,
                        ch_streamkey: ch.streamKey.value,
                        ch_playURL: ch.playbackUrl,
                    })
                }
            });
        }
    });
});

router.get('/contact/:id', ensureAuthenticated, async (req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.id }).lean().exec();
    const attendee = await User.find({ lesson: lesson._id }, 'username').lean().exec();
    res.render("lessonEmail", {
        attendee: attendee,
        id: req.params.id,
        lesson: lesson,
        user: req.session.user,
        userPhoto: req.session.user.userPhoto,
        userPhotoDef: req.session.user.userPhotoDef,
    })
})

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.id }).lean().exec();

    if (lesson.choreographerID === req.session.user.googleId) {
        const attendee = await User.find({ lesson: lesson._id }, 'username').lean().exec();
        res.render("lessonsEdit", {
            attendee: attendee,
            id: req.params.id,
            lesson: lesson,
            user: req.session.user,
            userPhoto: req.session.user.userPhoto,
            userPhotoDef: req.session.user.userPhotoDef,
        })
    } else {
        req.flash('error_msg', 'アカウント情報が正しくありません。');
        res.redirect('/users/profile');
    }
})

// add refund feature of stripe
router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    const lesson = await Lesson.findOne({ _id: req.body.id }).lean().exec();
    const time = moment(lesson.time).subtract(2, 'hours')

    // Lesson.deleteOne({ _id: req.body.id }, (err, lesson) => {
    //     console.log(err || lesson);
    User.updateMany({ lesson: lesson._id }, { $pull: { lesson: lesson._id } }, { upsert: true, new: true, setDefaultsOnInsert: true },
        (err, user) => {
            console.log(err || user);
            Lesson.deleteOne({ _id: req.body.id }, (err, lesson) => {
                console.log(err || lesson);
                req.flash('success_msg', 'レッスンの予約をキャンセルしました');
                res.redirect("/users/profile");
            })
        })
    // })

    // if (moment().isAfter(time)) {
    //     req.flash('error_msg', 'キャンセル可能時刻を過ぎています');
    //     res.redirect("/users/profile");
    // } else {
    // User.findByIdAndUpdate(req.session.user._id, { $pull: { lesson: lesson._id } }, { upsert: true, new: true, setDefaultsOnInsert: true },
    //     (err, user) => {
    //         console.log(err || user);
    //         req.session.user = user
    //         req.flash('success_msg', 'レッスンの予約をキャンセルしました');
    //         res.redirect("/users/profile");
    //     });
    // }
})

router.get('/student/details/:lesson_id', ensureAuthenticated, async (req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.lesson_id }).lean().exec();
    if (req.session.user.lesson.includes(lesson._id.toString())) {
        const choreographer = await User.findOne({ googleId: lesson.choreographerID }).lean().exec();
        res.render("lessonDet", {
            id: req.params.lesson_id,
            lesson: lesson,
            choreographer: choreographer,
            userPhoto: req.session.user.userPhoto,
            userPhotoDef: req.session.user.userPhotoDef,
        })
    } else {
        req.flash('error_msg', 'アカウント情報が正しくありません。');
        res.redirect('/users/profile');
    }
});

// add refund feature of stripe
router.post('/student/details/:lesson_id', ensureAuthenticated, async (req, res) => {
    const lesson = await Lesson.findOne({ _id: req.body.id }).lean().exec();
    const time = moment(lesson.time).subtract(2, 'hours')

    if (moment().isAfter(time)) {
        req.flash('error_msg', 'キャンセル可能時刻を過ぎています');
        res.redirect("/users/profile");
    } else {
        User.findByIdAndUpdate(req.session.user._id, { $pull: { lesson: lesson._id } }, { upsert: true, new: true, setDefaultsOnInsert: true },
            (err, user) => {
                console.log(err || user);
                req.session.user = user
                req.flash('success_msg', 'レッスンの予約をキャンセルしました');
                res.redirect("/users/profile");
            });
    }
})

module.exports = router;