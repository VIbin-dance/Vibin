var express = require('express');
var router = express.Router();
const moment = require('moment');

const { ensureAuthenticated } = require('../config/auth');
const { checkSession } = require("../config/session");
const { createChannel, updateStreamKey } = require('../config/aws/channel');

const User = require('../models/User');
const Channel = require('../models/Channel');
const Lesson = require('../models/Lesson');

router.get('/channel', ensureAuthenticated, async(req, res) => {
    let ch_count;
    User.findOne({ email: req.user._json.email }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard?page=1&limit=15');
        } else {
            let ch_name = "";
            let ch_latency = "";
            let ch_type = "";
            let ch_arn = "";
            Channel.findOne({ ch_name: req.session.user._id }, (err, ch) => {
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
                    user: req.session.user,
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

router.post('/create_channel', ensureAuthenticated, async(req, res) => {
    const ch_name = req.session.user._id;
    createChannel(req, res, ch_name);
});

router.post('/reset_streamkey', ensureAuthenticated, function(req, res) {
    updateStreamKey(req, res);
});

router.get('/teacher/:lesson_id', ensureAuthenticated, async(req, res) => {
    const ls = await Lesson.findOne({ _id: req.params.lesson_id }).lean().exec();
    if (ls.choreographerID === req.session.user._id) {
        Channel.findOne({ ch_name: req.session.user._id }, (err, ch) => {
            if (!ch) {
                req.flash('error_msg', '現在所有しているチャンネルがありません。');
                res.redirect('/lesson/channel');
            } else {
                res.render('teacher', {
                    user: req.session.user,
                    ch_name: ls.title,
                    ch_arn: ch.arn,
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

router.get('/student/:lesson_id', checkSession, async(req, res) => {
    Lesson.findOne({ _id: req.params.lesson_id }, (err, ls) => {
        if (!ls) {
            req.flash('error_msg', '選択したレッスンの情報が正しくありません。');
            res.redirect('/users/profile');
        } else if (ls.price != 0 && !req.session.user.lesson.includes(ls._id.toString())) {
            // && !user.lesson.includes(ls._id.toString())
            req.flash('error_msg', '選択したレッスンは購入されていません。');
            res.redirect(`/reservation/${req.params.lesson_id}`);
        } else {
            Channel.findOne({ ch_name: ls.choreographerID }, async(err, ch) => {
                if (!ch) {
                    req.flash('error_msg', '先生側の配信に何か問題が起きました。');
                    res.redirect('/users/profile');
                } else {
                    const choreographer = await User.findOne({ _id: ls.choreographerID }).lean().exec();
                    res.render('student', {
                        user: user,
                        choreographer: choreographer,
                        teacherPhoto: choreographer.userPhoto,
                        lesson: ls,
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

router.get('/edit/:id', ensureAuthenticated, async(req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.id }).lean().exec();

    if (lesson.choreographerID === req.session.user._id) {
        const attendee = await User.find({ lesson: lesson._id }, 'username').lean().exec();
        res.render("lessonsEdit", {
            attendee: attendee,
            id: req.params.id,
            lesson: lesson,
            user: req.session.user,
            userPhoto: req.session.user.userPhoto,
        })
    } else {
        req.flash('error_msg', 'アカウント情報が正しくありません。');
        res.redirect('/users/profile');
    }
})

// add refund feature of stripe
router.post('/edit/:id', ensureAuthenticated, async(req, res) => {
    const lesson = await Lesson.findOne({ _id: req.body.id }).lean().exec();
    const time = moment(lesson.time).subtract(2, 'hours')

    if (moment().isAfter(time)) {
        req.flash('error_msg', 'キャンセル可能時刻を過ぎています');
        res.redirect("/users/profile");
    } else {
        User.updateMany({ lesson: lesson._id }, { $pull: { lesson: lesson._id } }, { upsert: true, new: true, setDefaultsOnInsert: true },
            (err, user) => {
                console.log(err || user);
                Lesson.deleteOne({ _id: req.body.id }, (err, lesson) => {
                    console.log(err || lesson);
                    req.flash('success_msg', 'レッスンの予約をキャンセルしました');
                    res.redirect("/users/profile");
                })
            })
    }
})

router.get('/student/details/:lesson_id', ensureAuthenticated, async(req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.lesson_id }).lean().exec();
    if (!req.session.user.lesson || !req.session.user.lesson.includes(lesson._id.toString())) {
        req.flash('error_msg', '選択したレッスンは購入されていません');
        res.redirect(`/reservation/${req.params.lesson_id}`);
    } else {
        const choreographer = await User.findOne({ _id: lesson.choreographerID }).lean().exec();
        res.render("lessonDet", {
            id: req.params.lesson_id,
            lesson: lesson,
            choreographer: choreographer,
            userPhoto: req.session.user.userPhoto,
        })
    }
});

// add refund feature of stripe
router.post('/student/details/:lesson_id', ensureAuthenticated, async(req, res) => {
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