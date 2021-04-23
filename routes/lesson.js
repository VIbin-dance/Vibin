var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');


const User = require('../models/User');
const Video = require('../models/Video');
const Channel = require('../models/Channel');
const Schedule = require('../models/Schedule');
const Lesson = require('../models/Lesson');

// import & setting AIVS module
const {
    IvsClient,
    CreateChannelCommand,
    // GetChannelCommand,
    // BatchGetChannelCommand,
    // ListChannelsCommand,
    // UpdateChannelCommand,
    DeleteChannelCommand,
    // CreateStreamKeyCommand,
    // GetStreamKeyCommand,
    // BatchGetStreamKeyCommand,
    // ListStreamKeysCommand,
    // DeleteStreamKeyCommand,
    // GetStreamCommand,
    // ListStreamsCommand,
    // StopStreamCommand,
    // PutMetadataCommand,
    // ImportPlaybackKeyPairCommand,
    // GetPlaybackKeyPairCommand,
    // ListPlaybackKeyPairsCommand,
    // DeletePlaybackKeyPairCommand
} = require("@aws-sdk/client-ivs");

// AIVS Authentication, Define AIVS Obj from SDK
const aivs_client = new IvsClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION
});

// Routes
router.get('/', function (req, res) {
    // res.send('respond with a resource');
    res.render('/', {
        title: 'Student'
    });
});

router.get('/channel', ensureAuthenticated, async (req, res) => {
    // const user = await User.findOne({ email: req.user._json.email }).exec();
    let ch_count;
    // let currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // let videoCHK = currentUrl.search("aaa");
    User.findOne({ email: req.user._json.email }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'There is no such user');
            res.redirect('/dashboard?page=1&limit=15');
        } else {
            // console.log(req.user);
            // console.log("user ID : ", req.user.id);
            let ch_name = "";
            let ch_latency = "";
            let ch_type = "";
            let ch_arn = "";
            Channel.findOne({ googleId: req.user.id }, (err, ch) => {
                if(!ch) {
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

router.post('/create_channel', ensureAuthenticated, function (req, res) {
    const { ch_name } = req.body;
    // console.log( "channel Name : ", ch_name );
    try {
        const CreateChannel_option = {
            authorized: false,
            latencyMode: "NORMAL",
            name: ch_name,
            type: "STANDARD"
        };
        const CreateChannel = new CreateChannelCommand(CreateChannel_option);   //OK

        aivs_client.send(CreateChannel).then(
            (data) => {
                // console.log( data );
                Channel.findOneAndUpdate({
                    googleId: req.user.id
                }, {
                    googleId: req.user.id,
                    ch_name: data.channel.name,
                    arn: data.channel.arn,
                    authorized: data.channel.authorized,
                    ingestEndpoint: data.channel.ingestEndpoint,
                    latencyMode: data.channel.latencyMode,
                    playbackUrl: data.channel.playbackUrl,
                    type: data.channel.type,
                    streamKey: {
                        arn: data.streamKey.arn,
                        channelArn: data.streamKey.channelArn,
                        value: data.streamKey.value
                    }
                }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, ch) => {
                    if (err) {
                        req.flash('error_msg', 'チャンネルが作成されませんでした。');
                    } else {
                        req.flash('success_msg', 'チャンネルが作成されました。');
                    }
                    res.redirect('/lesson/channel');
                });
            },
            (error) => {
                // error handling.
                req.flash('error', 'チャンネルが作成されませんでした。');
                res.redirect('/lesson/channel');
            }
        );
    } catch (error) {
        // error handling.
        req.flash('error', 'チャンネルが作成されませんでした。');
        res.redirect('/lesson/channel');
    }

});

router.post('/delete_channel', ensureAuthenticated, function (req, res) {
    // const { ch_name } = req.body;
    // console.log( "channel Name : ", ch_name );
    try {
        Channel.findOne({ googleId: req.user.id }, (err, ch) => {
            if(err) {
                req.flash('error', 'チャンネルを削除できませんでした。Fail Mongoose search');
                res.redirect('/lesson/channel');
            }
            let channel_arn = ch.arn;
            const DeleteChannel_option = {
                "arn": channel_arn
            };
            
            const DeleteChannel = new DeleteChannelCommand(DeleteChannel_option);
            aivs_client.send(DeleteChannel).then(
                () => {
                    req.flash('success_msg', 'チャンネルを削除しました。');
                    res.redirect('/lesson/channel');
                },
                (error) => {
                    // error handling.
                    req.flash('error', 'チャンネルを削除できませんでした。- AIVS');
                    res.redirect('/lesson/channel');
                }
            );
            Channel.deleteOne({ googleId: req.user.id }, (err) => {
                if(err) {
                    req.flash('error', 'チャンネルを削除できませんでした。- Fail Mongoose delete');
                    res.redirect('/lesson/channel');
                }
            });
        });
    } catch (error) {
        // error handling.
        req.flash('error', 'チャンネルを削除できませんでした。');
        res.redirect('/lesson/channel');
    }

});

router.get('/teacher/:lesson_id', ensureAuthenticated, async (req, res) => {
    // const user = await User.findOne({ email: req.user._json.email }).exec();
    const ls = await Lesson.findOne({ _id: req.params.lesson_id }).exec();
    // let currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // let videoCHK = currentUrl.search("aaa");
    Channel.findOne({ googleId: req.user.id }, (err, ch) => {
        if(!ch) {
            req.flash('error_msg', '現在所有しているチャンネルがありません。');
            res.redirect('/lesson/channel');
        } else {
            ch_count = 1;
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
});

router.get('/student/:lesson_id', ensureAuthenticated, async (req, res) => {
    // const user = await User.findOne({ email: req.user._json.email }).exec();
    Lesson.findOne({ _id: req.params.lesson_id }, (err, ls) => {
        if(!ls){
            req.flash('error_msg', '選択したレッスンの期限が切れたか情報が正しくありません。');
            res.redirect('/users/profile');
        } else {
            Channel.findOne({ googleId: ls.choreographerID }, async (err, ch) => {
                if(!ch) {
                    req.flash('error_msg', '現在所有しているチャンネルがありません。');
                    res.redirect('/users/profile');
                } else {
                    const choreographer = await User.findOne({ googleId : ls.choreographerID }).exec();
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
                        // userPhoto: req.session.passport.user.photos[0].value,
                        // firstName: req.user.name.givenName,
                        // lastName: req.user.name.familyName,
                        // username: req.user._json.name,
                        // techerPhoto: req.session.passport.user.photos[0].value,
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

router.get('/edit/:id', ensureAuthenticated, async(req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.id }).exec()
    const user = await User.findOne({ email: req.user._json.email }).exec();
    res.render("lessonsEdit", {
        id: req.params.id,
        lesson: lesson,
        user: user,
        userPhoto: user.userPhoto,
        userPhotoDef: user.userPhotoDef,
    })
})

router.post('/edit/:id', ensureAuthenticated, async(req, res) => {
    const { id } = req.body;
    Lesson.findByIdAndDelete(id, (err, result) => {
        console.log(err || result);

        // User.findByIdAndUpdate(follower, { $pull: { lesson: lesson } }).exec();

        req.flash("success_msg", "Your lesson has been deleted");
        res.redirect("/users/profile")
    })
})


router.get('/student/details/:lesson_id', ensureAuthenticated, async (req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();

    // res.render()
});
// router.get('/student/:lesson_id', ensureAuthenticated, function (req, res) {

//     Schedule.findOne({ lesson_Id: req.params.lesson_id }, (err, ls) => {
//         if(!ls){
//             req.flash('error_msg', '選択したレッスンの期限が切れたか情報が正しくありません。');
//             res.redirect('/users/profile');
//         } else {
//             Channel.findOne({ googleId: ls.techerGoogleId }, (err, ch) => {
//                 if(!ch) {
//                     req.flash('error_msg', '現在所有しているチャンネルがありません。');
//                     res.redirect('/users/profile');
//                 } else {

//                     ch_count = 1;
//                     res.render('student', {
//                         userPhoto: req.session.passport.user.photos[0].value,
//                         email: req.user._json.email,
//                         firstName: req.user.name.givenName,
//                         lastName: req.user.name.familyName,
//                         username: req.user._json.name,
//                         count: ch_count,
//                         techerPhoto: req.session.passport.user.photos[0].value,
//                         ch_name: ls.lesson_name,
//                         ch_arn: ch.arn,
//                         ch_streamkey: ch.streamKey.value,
//                         ch_playURL: ch.playbackUrl,
//                         genres: ls.genre
//                     })
//                 }
//             });
//         }
//     });
    
// });

module.exports = router;
