const express = require("express");
const router = express.Router();
const paginate = require("express-paginate");
const passport = require("passport");
const fetch = require("node-fetch");
const moment = require("moment");
const multer = require('multer');
const sharp = require('sharp');
const stripe = require("stripe")("sk_test_51Hfnh4BHyna8CK9qjfFDuXjt1pmBPnPMoGflpvhPIet1ytDmqDZD3sayrbLnHbIQXnLBIZ8UWxSe62EaNZuw2oDO00b2zFDdno");
const { ensureAuthenticated } = require("../config/auth");
const { sendMail } = require("../config/email");
const { addCalendar } = require("../config/calendar");

const Video = require("../models/Video");
const User = require("../models/User");
const Lesson = require("../models/Lesson");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.render("landing");
});

router.get("/error", (req, res) => {
    res.send("Login error");
});
router.get("/privacy-policy", (req, res) => res.render("privacy-policy"));
router.get("/terms-of-service", (req, res) => res.render("terms-of-service"));

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/youtube.readonly",
            "https://www.googleapis.com/auth/calendar.events",
        ],
    })
);

router.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/error",
        session: true,
    }),
    async(req, res) => {
        const user = await User.findOne({
            email: req.user._json.email,
        }).exec();
        if (user.loginCount == 1) {
            req.flash("success_msg", res.__("msg.success.preference"));
            res.redirect("/users/preference");
        } else {
            req.flash("success_msg", res.__("msg.success.login"));
            res.redirect("/dashboard/-1?page=1&limit=15");
        }
    }
);

router.get("/dashboard/:sort", ensureAuthenticated, async(req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();

    Lesson.paginate({}, {
        page: req.query.page,
        limit: req.query.limit,
        sort: { time: req.params.sort },
    }, async(err, lesson) => {
        const choreographer = [];
        const time = [];
        for (let i = 0; i < lesson.docs.length; i++) {
            choreographer[i] = await User.findOne({ googleId: lesson.docs[i].choreographerID.toString() }).exec();
            time[i] = moment(lesson.docs[i].time).format('MM/DD HH:mm');
        }

        res.render("dashboard", {
            user: user,
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
            username: user.username,
            time: time,
            lesson: lesson,
            choreographer: choreographer,
            moment: moment,
            currentSort: req.params.sort,
            currentPage: lesson.page,
            pageCount: lesson.pages,
            pages: paginate.getArrayPages(req)(3, lesson.pages, req.query.page),
        });
    });
});

router.post("/dashboard", ensureAuthenticated, async(req, res) => {
    const { language, level, genre, purpose, mood, search } = req.body;

    const searchQuery = new RegExp(escapeRegex(search), "gi");

    const user = await User.findOne({ email: req.user._json.email }).exec();

    const query = {
        $and: [
            { language: language },
            { level: level },
            { genre: genre },
            { purpose: purpose },
            { mood: mood },
        ],
        $or: [
            { title: searchQuery },
            { choreographer: searchQuery },
        ],
    };

    Lesson.paginate(query, {
        page: req.query.page,
        limit: 100,
    }, async(err, lesson) => {
        if (!lesson.docs.length) {
            req.flash("error_msg", res.__("msg.error.video"));
            res.redirect("/dashboard/-1?page=1&limit=15");
        } else {
            const choreographer = [];
            const time = [];
            for (let i = 0; i < lesson.docs.length; i++) {
                choreographer[i] = await User.findOne({ _id: lesson.docs[i].choreographerID.toString() }).exec();
                time[i] = moment(lesson.docs[i].time).format('MM/DD HH:mm');
            }

            res.render("results", {
                user: user,
                userPhoto: user.userPhoto,
                userPhotoDef: user.userPhotoDef,
                username: user.username,
                lesson: lesson,
                time: time,
                choreographer: choreographer,
                currentPage: lesson.page,
                pageCount: lesson.pages,
                pages: paginate.getArrayPages(req)(3, lesson.pages, req.query.page),
            });
        }
    });
});

router.get("/results", ensureAuthenticated, (req, res) =>
    res.render("results")
);

router.get("/choreographer/:id", ensureAuthenticated, async(req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();

    Lesson.paginate({ choreographerID: req.params.id }, {
        page: req.query.page,
        limit: req.query.limit,
    }, async(err, lesson) => {
        const choreographer = await User.findOne({ _id: lesson.docs[0].choreographerID.toString() }).exec();
        const time = [];
        for (let i = 0; i < lesson.docs.length; i++) {
            time[i] = moment(lesson.docs[i].time).format('MM/DD HH:mm');
        }

        res.render("choreographer", {
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
            count: lesson.length,
            choreographer: choreographer,
            lesson: lesson,
            time: time,
            currentPage: lesson.page,
            pageCount: lesson.pages,
            pages: paginate.getArrayPages(req)(3, lesson.pages, req.query.page),
        });
    });
});

router.get("/calendar", ensureAuthenticated, (req, res) => {
    User.findOne({
            email: req.user._json.email,
        },
        (err, user) => {
            let time = encodeURIComponent(moment().format());
            let summary = [];
            let dateTime = [];
            let id = [];
            let idCal = [];

            fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?orderBy=startTime&q=vibin&singleEvents=true&timeMin=${time}&key=${process.env.API_key}`, {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`,
                        },
                    }
                )
                .then((response) => response.json())
                .then((data) => {
                    if (data.items == undefined) {
                        req.flash("error_msg", res.__("msg.error.auth"));
                        res.redirect("/");
                    } else {
                        for (i = 0; i < data.items.length; i++) {
                            summary[i] = data.items[i].summary;
                            dateTime[i] = moment(data.items[i].start.dateTime).format(
                                "MMMM Do YYYY, h:mm a"
                            );
                            id[i] = data.items[i].description;
                            idCal[i] = data.items[i].id;
                        }
                        res.render("calendar", {
                            userPhoto: user.userPhoto,
                            userPhotoDef: user.userPhotoDef,
                            count: data.items.length,
                            API_key: process.env.API_key,
                            CALENDAR_ID: user.email,
                            accessToken: user.accessToken,
                            summary: summary,
                            dateTime: dateTime,
                            id: id,
                            idCal: idCal,
                        });
                    }
                });
        }
    );
});

router.post("/calendar", ensureAuthenticated, (req, res) => {
    User.findOne({
            email: req.user._json.email,
        },
        (err, user) => {
            const { idCal } = req.body;

            let result = fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${user.email}/events/${idCal}?key=${process.env.API_key}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        Accept: "application/json",
                    },
                }
            );

            result.then(function(result) {
                if (result.status == 404) {
                    req.flash("error", res.__("msg.error.video"));
                    res.redirect("/calendar");
                } else if (result.status == 200 || 204) {
                    req.flash("success_msg", res.__("msg.success.dance_del"));
                    res.redirect("/calendar");
                }
            });
        }
    );
});

router.get("/player/:id", ensureAuthenticated, (req, res) => {
    Video.findOne({
            id: req.params.id,
        },
        async(err, result) => {
            const user = await User.findOne({
                email: req.user._json.email,
            }).exec();
            if (result == null) {
                req.flash("error_msg", res.__("msg.error.video_del"));
                res.redirect("/dashboard/-1?page=1&limit=15");
            } else {
                res.render("player", {
                    like: user.like,
                    userPhoto: user.userPhoto,
                    userPhotoDef: user.userPhotoDef,
                    id: req.params.id,
                    ObjID: result._id,
                    title: result.title,
                    choreographer: result.choreographer,
                    level: result.level,
                });
            }
        }
    );
});

router.post("/player/:id", ensureAuthenticated, async(req, res) => {
    const { id, action } = req.body;

    const videoID = await Video.findOne({
            id: id,
        },
        "_id"
    ).exec();

    User.findOne({
            email: req.user._json.email,
        },
        (err, user) => {
            const userID = user._id;

            try {
                if (action == "like") {
                    Video.findByIdAndUpdate(videoID._id, {
                        $push: {
                            like: [{
                                id: userID.toString(),
                            }, ],
                        },
                    }).exec();
                    User.findByIdAndUpdate(userID, {
                            $push: {
                                like: [{
                                    id: videoID.toObject()._id,
                                }, ],
                            },
                        })
                        .exec()
                        .then(function(user) {
                            res.redirect(`/player/${id}`);
                        })
                        .catch((err) => console.log(err));
                } else if (action == "unlike") {
                    Video.findByIdAndUpdate(videoID._id, {
                        $pull: {
                            like: {
                                id: user._id.toString(),
                            },
                        },
                    }).exec();
                    User.findByIdAndUpdate(userID, {
                            $pull: {
                                like: {
                                    id: videoID.toObject()._id,
                                },
                            },
                        })
                        .exec()
                        .then(function(user) {
                            res.redirect(`/player/${id}`);
                        })
                        .catch((err) => console.log(err));
                }
            } catch (err) {
                console.log(err);
            }
        }
    );
});

router.get("/reservation/:id", ensureAuthenticated, async(req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();
    const lesson = await Lesson.findOne({ _id: req.params.id }).exec();
    const choreographer = await User.findOne({ googleId: lesson.choreographerID }).exec();
    const account = await stripe.accounts.retrieve(choreographer.stripeID);

    if (user.lesson.includes(lesson.id)) {
        res.render('success', {
            lesson: lesson,
            choreographer: choreographer,
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
        })
    } else if (lesson.price === 0) {
        res.render('reservation', {
            id: undefined,
            params: req.params.id,
            lesson: lesson,
            choreographer: choreographer,
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
        })
    } else {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                name: lesson.title,
                amount: lesson.price,
                currency: "jpy",
                quantity: 1,
            }, ],
            customer_email: user.email,
            payment_intent_data: {
                application_fee_amount: lesson.price * 0.2,
                transfer_data: {
                    destination: account.id,
                },
            },
            success_url: `http://localhost:5000/success/${req.params.id}`,
            cancel_url: `http://localhost:5000/reservation/${req.params.id}`,
        });

        res.render("reservation", {
            id: session.id,
            lesson: lesson,
            choreographer: choreographer,
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
        });
    }
});

router.get('/success/:id', ensureAuthenticated, async(req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.id }).exec();
    const user = await User.findOne({ email: req.user._json.email }).exec();

    if (user.lesson.includes(lesson.id)) {
        console.log('already done')
    } else {
        User.findOneAndUpdate({ email: req.user._json.email }, { $push: { lesson: [lesson._id] } }, { upsert: true, new: true, setDefaultsOnInsert: true },
            (err, user) => {
                console.log(err || user);
            }
        );

        const text = `
      <h1>レッスンご購入ありがとうございます&#10024;</h1>
      <h2>タイトル：${lesson.title}</h2>
      <a href="/reservation/<%= lesson.id %>">
        <img src="data:image/<%=lesson.thumbnail.contentType%>;base64, <%=lesson.thumbnail.data.toString('base64')%>" alt="thumbnail">
      </a>
      <p>日時：${lesson.time}</p>
      <p>価格：${lesson.price}</p>
      <p>レベル：${lesson.level}</p>
      <p>ジャンル：${lesson.genre}</p>
      <p>ムード：${lesson.mood}</p>`;

        sendMail(user.email, "ご購入ありがとうございました!", text);
        const dateTime = moment(lesson.time).format("YYYY-MM-DDThh:mm");
        addCalendar(user, lesson.title, dateTime);
    }

    res.render('success', {
        userPhoto: user.userPhoto,
        userPhotoDef: user.userPhotoDef,
    });
})

router.get("/create", ensureAuthenticated, async(req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();

    let render = {
        choreographer: user.username,
        userPhoto: user.userPhoto,
        userPhotoDef: user.userPhotoDef,
        CLIENT_id: process.env.ZOOM_CLIENT_ID,
    };

    if (user.stripeID) {
        const account = await stripe.accounts.retrieve(user.stripeID);
        const loginLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: "https://localhost:5000/create",
            return_url: "http://localhost:5000/create",
            type: "account_onboarding",
        });

        render.account = account;
        render.loginLink = loginLink;
    }

    res.render("create", render);
});

router.post("/create", upload.single('thumbnail'), async(req, res) => {
    const { title, language, time, price, level, genre, purpose, mood } = req.body;
    const user = await User.findOne({ email: req.user._json.email }).exec();
    const choreographerID = user.googleId;
    let errors = [];
    let account;
    let loginLink;

    if (title == "" || req.file == undefined || language == "" || time == "" || price == "" || level == undefined || genre == undefined || purpose == undefined || mood == undefined) {
        errors.push({ msg: res.__("msg.error.fill") });
    }

    if (user.stripeID == undefined) {
        try {
            const account = await stripe.accounts.create({ type: "express" });
            console.log(account)
            const loginLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: "https://localhost:5000/create",
                return_url: "http://localhost:5000/create",
                type: "account_onboarding",
            });

            User.findOneAndUpdate({ email: req.user._json.email }, { stripeID: account.id }, { upsert: true, new: true, setDefaultsOnInsert: true },
                (err, user) => {
                    console.log(err || user);
                });
            res.redirect(loginLink.url);

        } catch (err) {
            res.status(500).send({
                error: err.message,
            });
        }
    } else {
        account = await stripe.accounts.retrieve(user.stripeID);
        console.log(account)
        loginLink = await stripe.accounts.createLoginLink(user.stripeID);
    }


    if (errors.length > 0) {
        res.render("create", {
            errors,
            account: account,
            loginLink: loginLink,
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
            API_key: process.env.API_key,
            CLIENT_id: process.env.ZOOM_CLIENT_ID,
            title,
            language,
            choreographer: user.username,
            price,
            level,
            genre,
            purpose,
            mood,
        });
    } else {
        const buffer = await sharp(req.file.buffer).resize(640, 360).toBuffer();
        const thumbnail = {
            data: buffer,
            originalname: req.file.originalname,
            contentType: req.file.mimetype,
        };

        Lesson.findOne({ title: title }).then(async(lesson) => {
            if (lesson) {
                errors.push({ msg: res.__("msg.error.dupl") });
                res.render("create", {
                    errors,
                    account: account,
                    loginLink: loginLink,
                    userPhoto: user.userPhoto,
                    userPhotoDef: user.userPhotoDef,
                    API_key: process.env.API_key,
                    CLIENT_id: process.env.ZOOM_CLIENT_ID,
                });
            } else {
                const dateTime = moment(time).format("YYYY-MM-DDThh:mm");

                addCalendar(user, title, dateTime);

                const newLesson = new Lesson({ title, thumbnail, language, choreographerID, time, price, level, genre, purpose, mood });
                newLesson
                    .save()
                    .then(async function(lesson) {
                        const text = `
                                        <h1>レッスンが登録されました&#10024;</h1>
                                        <h2>タイトル：${lesson.title}</h2>
                                        <a href="/reservation/<%= lesson.id %>">
                                          <img src="data:image/<%=lesson.thumbnail.contentType%>;base64, <%=lesson.thumbnail.data.toString('base64')%>" alt="thumbnail">
                                        </a>
                                        <p>価格：${lesson.price}</p>
                                        <p>レベル：${lesson.level}</p>
                                        <p>ジャンル：${lesson.genre}</p>
                                        <p>ムード：${lesson.mood}</p>`;

                        sendMail(user.email, "レッスンが登録されました!", text);

                        req.flash("success_msg", res.__("msg.success.schedule"));
                        res.redirect("/calendar");
                    })
                    .catch((err) => console.log(err));
            }
        });
    }
    Lesson.updateMany({}, {
        $addToSet: {
            language: ["any"],
            level: ["any"],
            genre: ["any"],
            purpose: ["any"],
            mood: ["any"],
        }
    }, (err, result) => {
        console.log(err || result);
    });
});

// Match the raw body to content type application/json
router.post("/webhook", (req, res) => {
    let event;

    try {
        event = JSON.parse(req.body);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case "payment_method.attached":
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
        received: true,
    });
});

router.get('/lessons/edit/:id', ensureAuthenticated, async(req, res) => {
    const lesson = await Lesson.find({ _id: req.params.id }).exec()
    const user = await User.findOne({ email: req.user._json.email }).exec();
    res.render("lessonsEdit", {
        id: req.params.id,
        lesson: lesson,
        user: user,
        userPhoto: user.userPhoto,
        userPhotoDef: user.userPhotoDef,
    })
})

router.post('/lessons/edit/:id', ensureAuthenticated, async(req, res) => {
    const { id } = req.body;
    Lesson.findByIdAndDelete(id, (err, result) => {
        console.log(err || result);
        req.flash("success_msg", "Your lesson has been deleted");
        res.redirect("/users/profile")
    })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;