const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const passport = require('passport');
const fetch = require('node-fetch');
const moment = require('moment');
const stripe = require('stripe')('sk_test_51Hfnh4BHyna8CK9qjfFDuXjt1pmBPnPMoGflpvhPIet1ytDmqDZD3sayrbLnHbIQXnLBIZ8UWxSe62EaNZuw2oDO00b2zFDdno');
const { ensureAuthenticated } = require('../config/auth');
const { onlyDevs } = require('../config/dev');
const { sendMail } = require('../config/email');

const Video = require('../models/Video');
const User = require('../models/User');
const Lesson = require('../models/Lesson');



router.get('/', (req, res) => {
    if (req.session.passport) {
        req.flash('success_msg', 'You are logged in!');
        res.redirect('/dashboard/-1?page=1&limit=15');
    } else {
        res.render('landing')
    }
});

// router.get("/debug", (req, res) => {
//     res.json({
//         "req.session": req.session,     // session data
//         "req.user": req.user,           // user data
//         "req._passport": req._passport, // passport data
//     })
// })

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/calendar.events'
    ]
}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/error',
        session: true
    }),
    (req, res) => {
        req.flash('success_msg', 'You are logged in!')
        res.redirect('/dashboard/-1?page=1&limit=15');
    }
);

router.get('/error', (req, res) => {
    res.send('Login error');
});

router.get('/dashboard/:sort', ensureAuthenticated, (req, res) => {
    Video.paginate({}, { page: req.query.page, limit: req.query.limit, sort: { publishedDate: req.params.sort } }, (err, result) => {
        const title = [];
        const choreographer = [];
        const url = [];
        const level = [];
        const thumbnail = [];
        const id = [];

        if (req.params.sort == -1) {
            let sort = 1;
        } else if (req.params.sort == 1) {
            let sort = -1;
        }

        for (let i = 0; i < result.docs.length; i++) {
            title[i] = result.docs[i].title;
            choreographer[i] = result.docs[i].choreographer;
            url[i] = result.docs[i].url;
            level[i] = result.docs[i].level[0];
            thumbnail[i] = result.docs[i].thumbnail;
            id[i] = result.docs[i].id;
        }
        res.render('dashboard', {
            userPhoto: req.session.passport.user.photos[0].value,
            count: result.total,
            username: req.session.passport.user.displayName,
            videos: result.docs,
            title: title,
            choreographer: choreographer,
            url: url,
            id: id,
            level: level,
            thumbnail: thumbnail,
            currentSort: req.params.sort,
            currentPage: result.page,
            pageCount: result.pages,
            pages: paginate.getArrayPages(req)(3, result.pages, req.query.page)
        })
    });
});

router.post('/dashboard', ensureAuthenticated, (req, res) => {
    const { lengthCat, language, level, genre, purpose, mood, search } = req.body;

    const searchQuery = new RegExp(escapeRegex(search), 'gi');

    const query = {
        $and: [
            { lengthCat: lengthCat },
            { language: language },
            { level: level },
            { genre: genre },
            { purpose: purpose },
            { mood: mood }
        ],
        $or: [
            { title: searchQuery },
            { choreographer: searchQuery }
        ]
    }

    Video.paginate(query, { page: req.query.page, limit: 100 }, (err, result) => {
        let title = [];
        let choreographer = [];
        let url = [];
        let level = [];
        let thumbnail = [];
        let id = [];

        if (!result.docs.length) {
            req.flash('error_msg', "Looks like we don't have that video yet!");
            res.redirect('/dashboard/-1?page=1&limit=15');
        } else {
            for (let i = 0; i < result.docs.length; i++) {
                title[i] = result.docs[i].title;
                choreographer[i] = result.docs[i].choreographer;
                url[i] = result.docs[i].url;
                level[i] = result.docs[i].level[0];
                thumbnail[i] = result.docs[i].thumbnail;
                id[i] = result.docs[i].id;
            }
            res.render('results', {
                userPhoto: req.session.passport.user.photos[0].value,
                count: result.total,
                username: req.session.passport.user.displayName,
                videos: result.docs,
                title: title,
                choreographer: choreographer,
                url: url,
                id: id,
                level: level,
                thumbnail: thumbnail,
                currentPage: result.page,
                pageCount: result.pages,
                pages: paginate.getArrayPages(req)(3, result.pages, req.query.page)
            })
        }
    })
})

router.get('/results', ensureAuthenticated, (req, res) => res.render('results'));

router.get('/choreographer/:id', ensureAuthenticated, (req, res) => {
    Video.find({ choreographer: req.params.id }, (err, result) => {
        const title = [];
        const url = [];
        const level = [];
        const thumbnail = [];
        const id = [];
        for (let i = 0; i < result.length; i++) {
            title[i] = result[i].title;
            url[i] = result[i].url;
            level[i] = result[i].level;
            thumbnail[i] = result[i].thumbnail;
            id[i] = result[i].id;
        }
        res.render('choreographer', {
            userPhoto: req.session.passport.user.photos[0].value,
            count: result.length,
            choreographer: req.params.id,
            videos: result,
            title: title,
            url: url,
            level: level,
            thumbnail: thumbnail,
            id: id,
        })
    })
})

router.get('/calendar', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user._json.email }, (err, user) => {
        let time = encodeURIComponent(moment().format());   //google calendar parameter : current time
        let summary = [];
        let dateTime = [];
        let id = [];
        let idCal = [];
        let run_status = [];
 
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?orderBy=startTime&q=vibin&singleEvents=true&timeMin=${time}&key=${process.env.API_key}`, {
            'headers': { 'Authorization': `Bearer ${user.accessToken}` },
        })
            .then(response => response.json())
            .then(data => {
                for (i = 0; i < data.items.length; i++) {
                    summary[i] = data.items[i].summary
                    dateTime[i] = moment(data.items[i].start.dateTime).format('MMMM Do YYYY, h:mm a');
                    id[i] = data.items[i].description
                    idCal[i] = data.items[i].id

                    var s_date = new Date( data.items[i].start.dateTime ).getTime();
                    var e_date = new Date( data.items[i].end.dateTime ).getTime();
                    var c_date = new Date().getTime();

                    if( s_date < c_date && e_date > c_date ) {
                        run_status[i] = "( living now )"
                    } else {
                        run_status[i] = ""
                    }
                }

                // このパラメータに予約購入したレッスンのデータをDBから検索して記入してください。
                // フィールド名は実際DBでどうなっているかを確認して修正する必要があります。
                let date = moment(new Date()).format("MMMM Do YYYY, h:mm A");
                var tickets = [
                    { lesson_title: "サンプル1", lesson_id: "123123", choreographerName: "阿部一燈", level: "Intermediate", genre: "Locking", mood: "Groovy, Funky, any", date: date },
                    { lesson_title: "サンプル2", lesson_id: "123123", choreographerName: "阿部一燈", level: "Intermediate", genre: "Locking", mood: "Groovy, Funky, any", date: date }
                ];
                res.render('calendar', {
                    userPhoto: req.session.passport.user.photos[0].value,
                    count: data.items.length,
                    API_key: process.env.API_key,
                    CALENDAR_ID: user.email,
                    accessToken: user.accessToken,
                    summary: summary,
                    dateTime: dateTime,
                    id: id,
                    idCal: idCal,
                    run_status: run_status,
                    tickets: tickets
                });
            })
    })
});

router.post('/calendar', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user._json.email }, (err, user) => {

        const { idCal } = req.body;

        let result = fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events/${idCal}?key=${process.env.API_key}`, {
            'method': 'DELETE',
            'headers': { 'Authorization': `Bearer ${user.accessToken}`, 'Accept': 'application/json' }
        })

        result.then(function (result) {
            if (result.status == 404) {
                req.flash('error', 'The video does not exist');
                res.redirect('/calendar');
            } else if (result.status == 200 || 204) {
                req.flash('success_msg', 'The dance is now deleted');
                res.redirect('/calendar');
            }
        })
    })
});

router.get('/player/:id', ensureAuthenticated, (req, res) => {
    Video.findOne({ id: req.params.id }, (err, result) => {
        if (result == null) {
            req.flash('error_msg', 'The video is either deleted or modified!');
            res.redirect('/dashboard?page=1&limit=15');
        } else {
            res.render('player', {
                userPhoto: req.session.passport.user.photos[0].value,
                id: req.params.id,
                title: result.title,
                choreographer: result.choreographer,
                level: result.level,
            });
        }
    })
});

router.post('/player/:id', ensureAuthenticated, (req, res) => {
    const { id, date, time } = req.body;
    let errors = [];

    Video.findOne({ id: id }, (err, result) => {
        User.findOne({ email: req.user._json.email }, (err, user) => {
            fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?key=${process.env.API_key}`, {
                'method': 'POST',
                'headers': {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    'end': {
                        'dateTime': date + ":00",
                        'timeZone': 'Asia/Tokyo'
                    },
                    'start': {
                        'dateTime': date + ":00",
                        'timeZone': 'Asia/Tokyo'
                    },
                    'summary': result.title + " Vibin'",
                    "description": id,
                    "reminders": {
                        "useDefault": false,
                        "overrides": [
                            {
                                "method": "email",
                                "minutes": 30
                            }
                        ]
                    }
                })
            })
            .then(response => response.json())
            .then(data => {
                if (date == '') {
                    errors.push({ msg: 'Please fill in all fields' });
                }

                if (errors.length > 0) {
                    res.render('player', { errors, userPhoto: req.session.passport.user.photos[0].value, title: result.title, choreographer: result.choreographer, id: id, level: result.level });
                }
                else {
                    req.flash('success_msg', 'The dance is now scheduled');
                    res.redirect('/calendar');
                }
            })
        })
    })
})

router.get('/upload', ensureAuthenticated, onlyDevs, (req, res) => {
    res.render('upload', {
        userPhoto: req.session.passport.user.photos[0].value,
        API_key: process.env.API_key,
    });
})

router.post('/upload', (req, res) => {
    const { title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood } = req.body;
    let errors = [];

    // Check required fields
    if (title == '' || choreographer == '' || thumbnail == '' || url == '' || id == '' || publishedDate == '' || length == '' || lengthCat == '' || language == '' || level == undefined || genre == undefined || purpose == undefined || mood == undefined) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('upload', { errors, userPhoto: req.session.passport.user.photos[0].value, API_key: process.env.API_key, CLIENT_id: process.env.CLIENT_id, title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood });
    } else {
        Video.findOne({ url: url })
            .then(video => {
                if (video) {
                    errors.push({ msg: 'The video is already registered!' });
                    res.render('upload', {
                        errors, userPhoto: req.session.passport.user.photos[0].value, API_key: process.env.API_key
                    });
                } else {
                    const newVideo = new Video({ title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood });
                    newVideo.save()
                        .then(function (video) {
                            req.flash('success_msg', 'The dance is now registered');
                            res.redirect('/upload');
                        })
                        .catch(err => console.log(err));
                }
            })
    }
    Video.updateMany(
        {},
        {
            $addToSet: {
                length: ["any"],
                language: ["any"],
                level: ["any"],
                lengthCat: ["any"],
                genre: ["any"],
                purpose: ["any"],
                mood: ["any"]
            }
        },
        function (err, result) {
            if (err) {
                console.log(err);
            }
        }
    );
})

// Match the raw body to content type application/json
router.post('/webhook', (req, res) => {
    let event;

    try {
        event = JSON.parse(req.body);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
            // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({
        received: true
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;