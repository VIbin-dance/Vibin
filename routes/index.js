const express = require("express");
const router = express.Router();
const paginate = require("express-paginate");
const passport = require("passport");
const fetch = require("node-fetch");
const moment = require("moment");
const multer = require("multer");
const sharp = require("sharp");
const stripe = require("stripe")(process.env.stripekey);

const { ensureAuthenticated } = require("../config/auth");
const { checkSession } = require("../config/session");
const { sendMail } = require("../config/email");
const { addCalendar } = require("../config/calendar");
const { createChannel } = require("../config/aws/channel");
const { uploadObject } = require("../config/aws/s3");

const User = require("../models/User");
const Lesson = require("../models/Lesson");
const Channel = require("../models/Channel");

// put these functions in one folder and reference to use more than once
findLesson = function(id) {
    return Lesson.find({ choreographerID: id });
};

findTicket = function(id) {
    return Lesson.find({ _id: id });
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/about", async(req, res) => res.render("landing"));
router.get("/error", (req, res) => res.send("Login error"));

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
            "https://www.googleapis.com/auth/calendar.events",
        ],
    })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/error",
        session: true,
    }),
    async(req, res) => {
        User.findOne({ email: req.user._json.email }, (err, user) => {
            req.session.user = user;
            req.flash("success_msg", res.__("msg.success.login"));
            res.redirect("/");
        });
    }
);

router.get("/", checkSession, async(req, res) => {
    Lesson.paginate({}, {
            page: req.query.page,
            limit: req.query.limit,
            sort: { time: -1 },
        },
        async(err, lesson) => {
            const choreographer = [];

            // find a better way to iterate pushing into choreographer array
            for (let i = 0; i < lesson.docs.length; i++) {
                choreographer[i] = await User.findOne({ _id: lesson.docs[i].choreographerID.toString() },
                        "username"
                    )
                    .lean()
                    .exec();
            }

            res.render("dashboard", {
                user: user,
                lesson: lesson,
                choreographer: choreographer,
                moment: moment,
                currentSort: req.params.sort,
                currentPage: lesson.page,
                pageCount: lesson.pages,
                pages: paginate.getArrayPages(req)(3, lesson.pages, req.query.page),
            });
        }
    );
});

router.post("/", checkSession, async(req, res) => {
    const { level, genre, mood, search } = req.body;
    const searchQuery = new RegExp(escapeRegex(search), "gi");
    const query = {
        $and: [{ level: level }, { genre: genre }, { mood: mood }],
        $or: [{ title: searchQuery }, { choreographer: searchQuery }],
    };

    Lesson.paginate(
        query, {
            page: req.query.page,
            limit: 100,
            sort: { time: -1 },
        },
        async(err, lesson) => {
            if (!lesson.docs.length) {
                req.flash("error_msg", res.__("msg.error.video"));
                res.redirect("/");
            } else {
                const choreographer = [];
                for (let i = 0; i < lesson.docs.length; i++) {
                    choreographer[i] = await User.findOne({ _id: lesson.docs[i].choreographerID.toString() },
                        "username"
                    ).exec();
                }

                res.render("results", {
                    user: user,
                    lesson: lesson,
                    choreographer: choreographer,
                    moment: moment,
                    currentPage: lesson.page,
                    pageCount: lesson.pages,
                    pages: paginate.getArrayPages(req)(3, lesson.pages, req.query.page),
                });
            }
        }
    );
});

router.get("/results", (req, res) => res.render("results"));

router.get("/choreographer/:id", checkSession, async(req, res) => {
    Lesson.paginate({ choreographerID: req.params.id }, {
            page: req.query.page,
            limit: req.query.limit,
            sort: { time: -1 },
        },
        async(err, lesson) => {
            User.findOne({ _id: req.params.id }, (err, choreographer) => {
                res.render("choreographer", {
                    user: user,
                    lesson: lesson,
                    choreographer: choreographer,
                    moment: moment,
                    currentPage: lesson.page,
                    pageCount: lesson.pages,
                    pages: paginate.getArrayPages(req)(3, lesson.pages, req.query.page),
                });
            }).lean();
        }
    );
});

router.get("/calendar", ensureAuthenticated, (req, res) => {
    fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${req.session.user.email}/events?orderBy=startTime&q=vibin&singleEvents=true&key=${process.env.API_key}`, {
                headers: {
                    Authorization: `Bearer ${req.session.user.accessToken}`,
                },
            }
        )
        .then((response) => response.json())
        .then(async(data) => {
            if (data.items == undefined) {
                req.flash("error_msg", res.__("msg.error.auth"));
                res.redirect("/");
            } else {
                // for (i = 0; i < data.items.length; i++) {
                //     summary[i] = data.items[i].summary
                //     dateTime[i] = moment(data.items[i].start.dateTime).format('MMMM Do YYYY, h:mm a');
                //     id[i] = data.items[i].description
                //     idCal[i] = data.items[i].id

                //     var s_date = new Date(data.items[i].start.dateTime).getTime();
                //     var e_date = new Date(data.items[i].end.dateTime).getTime();
                //     var c_date = new Date().getTime();

                //     if (s_date < c_date && e_date > c_date) {
                //         run_status[i] = "( live now )"
                //     } else {
                //         run_status[i] = ""
                //     }
                // }

                const [tickets] = await Promise.all([
                    findTicket(req.session.user.lesson),
                ]);

                const choreographer = [];
                if (req.session.user.lesson) {
                    for (let i = 0; i < req.session.user.lesson.length; i++) {
                        choreographer[i] = await User.findOne({ _id: tickets[i].choreographerID },
                                "username"
                            )
                            .lean()
                            .exec();
                    }
                }

                res.render("calendar", {
                    user: req.session.user,
                    userPhoto: req.session.user.userPhoto,
                    moment: moment,
                    API_key: process.env.API_key,
                    CALENDAR_ID: req.session.user.email,
                    tickets: tickets,
                    choreographer: choreographer,
                });
            }
        });
});
// not yet
// router.post("/calendar", ensureAuthenticated, (req, res) => {
//     User.findOne({
//         email: req.user._json.email,
//     },
//         (err, user) => {
//             const { idCal } = req.body;

//             let result = fetch(
//                 `https://www.googleapis.com/calendar/v3/calendars/${user.email}/events/${idCal}?key=${process.env.API_key}`, {
//                 method: "DELETE",
//                 headers: {
//                     Authorization: `Bearer ${user.accessToken}`,
//                     Accept: "application/json",
//                 },
//             }
//             );

//             result.then(function (result) {
//                 if (result.status == 404) {
//                     req.flash("error", res.__("msg.error.video"));
//                     res.redirect("/calendar");
//                 } else if (result.status == 200 || 204) {
//                     req.flash("success_msg", res.__("msg.success.dance_del"));
//                     res.redirect("/calendar");
//                 }
//             });
//         }
//     );
// });

router.get("/reservation/:id", checkSession, async(req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.id }).lean().exec();
    const choreographer = await User.findOne({ _id: lesson.choreographerID })
        .lean()
        .exec();

    if (moment().isAfter(lesson.time) && lesson.price === 0) {
        res.redirect(`/lesson/student/${req.params.id}`);
    } else if (
        user.lesson &&
        user.lesson.includes(lesson._id.toString()) === true
    ) {
        res.render("success", {
            user: user,
            params: req.params.id,
            lesson: lesson,
            choreographer: choreographer,
            moment: moment,
        });
    } else if (lesson.price === 0 || !req.session.user) {
        res.render("reservation", {
            id: undefined,
            params: req.params.id,
            lesson: lesson,
            choreographer: choreographer,
            moment: moment,
            user: user,
        });
    } else {
        const host = req.get("host");
        const account = await stripe.accounts.retrieve(choreographer.stripeID);
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
            success_url: `https://${host}/success/${req.params.id}` +
                "?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: `https://${host}/reservation/${req.params.id}`,
        });

        res.render("reservation", {
            id: session.id,
            lesson: lesson,
            choreographer: choreographer,
            moment: moment,
            user: user,
        });
    }
});

router.get("/success/:id", ensureAuthenticated, async(req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.id }).lean().exec();
    // const choreographer = await User.findOne({ googleId: lesson.choreographerID }).lean().exec();
    const dateTime = moment(lesson.time).format('MM/DD HH:mm');

    let session;
    if (req.query.session_id) {
        session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    }

    if (
        req.session.user.lesson &&
        req.session.user.lesson.includes(lesson._id.toString()) === true
    ) {
        console.log("already done");
        res.redirect(`/reservation/${req.params.id}`);
    } else if (
        lesson.price === 0 ||
        (session != undefined && session.payment_status == "paid")
    ) {
        User.findByIdAndUpdate(
            req.session.user._id, { $push: { lesson: lesson._id } }, { upsert: true, new: true, setDefaultsOnInsert: true },
            (err, user) => {
                console.log(err || user);
                console.log(session);
                req.session.user.lesson = user.lesson;

                const text = `
        <p>この度はレッスンのご予約をいただきまして、誠にありがとうございます。</p>
        <p>▼ご予約内容▼</p>
        <p>--------------------------------------------</p>
        <p>${lesson.title}</p>
        <a href="/reservation/<%= lesson.id %>">
        <img src="data:image/<%=lesson.thumbnail.contentType%>;base64, <%=lesson.thumbnail.data.toString('base64')%>" alt="thumbnail">
        </a>
        <p>日時：${dateTime}</p>
        <p>価格：${lesson.price} Yen</p>
        <p>${lesson.level[0]} | ${lesson.genre[0]} | ${lesson.purpose[0]} | ${lesson.mood[0]}</p>
        <p>--------------------------------------------</p>`;

                sendMail(user.email, "ご予約を受付いたしました！", text);
                addCalendar(user, lesson.title, dateTime);
                res.redirect(`/reservation/${req.params.id}`);
            }
        );
    } else {
        res.redirect(`/reservation/${req.params.id}`);
    }
});

router.get("/create", ensureAuthenticated, async(req, res) => {
    const host = req.get("host");
    let render = {
        user: req.session.user,
        choreographer: req.session.user.username,
    };

    if (req.session.user.stripeID) {
        const account = await stripe.accounts.retrieve(req.session.user.stripeID);
        let loginLink;

        if (account.payouts_enabled == true) {
            loginLink = await stripe.accounts.createLoginLink(account.id);
        } else {
            loginLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: `https://${host}/create`,
                return_url: `https://${host}/create`,
                type: "account_onboarding",
            });
        }

        render.account = account;
        render.loginLink = loginLink;

    } else if (!req.session.user.stripeID) {
        try {
            const account = await stripe.accounts.create({ type: "express" });
            const loginLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: `https://${host}/create`,
                return_url: `https://${host}/create`,
                type: "account_onboarding",
            });

            User.findOneAndUpdate({ email: req.user._json.email }, { stripeID: account.id }, { upsert: true, new: true, setDefaultsOnInsert: true },
                (err, user) => {
                    console.log(err || user);
                    req.session.user = user;
                }
            );

            render.loginLink = loginLink;

        } catch (err) {
            res.status(500).send({
                error: err.message,
            });
        }
    }

    res.render("create", render);
});

router.post("/create", upload.single("thumbnail"), async(req, res) => {
    const { title, time, price, level, genre, mood } = req.body;
    const user = await User.findOne({ email: req.user._json.email }).lean().exec();
    const choreographerID = user._id;
    const host = req.get("host");
    let errors = [];
    let loginLink;

    const account = await stripe.accounts.retrieve(req.session.user.stripeID);

    if (account.payouts_enabled == true) {
        loginLink = await stripe.accounts.createLoginLink(account.id);
    } else {
        loginLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `https://${host}/create`,
            return_url: `https://${host}/create`,
            type: "account_onboarding",
        });
    }

    if (account.payouts_enabled == false) {
        errors.push({ msg: res.__("銀行口座の情報を設定してください。") });
    }

    if (
        title == "" ||
        req.file == undefined ||
        time == "" ||
        price == "" ||
        level == undefined ||
        genre == undefined ||
        mood == undefined
    ) {
        errors.push({ msg: res.__("msg.error.fill") });
    }

    Lesson.findOne({ title: title }).then((lesson) => {
        if (lesson) {
            errors.push({ msg: res.__("msg.error.dupl") });
        }
    });

    if (errors.length > 0) {
        res.render("create", {
            errors,
            account: account,
            loginLink: loginLink,
            user: req.session.user,
            title,
            choreographer: req.session.user.username,
            price,
            level,
            genre,
            mood,
        });
    } else {
        const buffer = await sharp(req.file.buffer).resize(640, 360).webp().toBuffer();

        const params = {
            Bucket: process.env.THUMBNAIL_BUCKET_NAME,
            Key: title,
            Body: buffer,
            ACL: "public-read-write",
            ContentType: "image/webp",
        };

        const thumbnail = await uploadObject(params);

        const newLesson = new Lesson({
            title,
            thumbnail: thumbnail.Location,
            choreographerID,
            time,
            price,
            level,
            genre,
            mood,
        });

        newLesson
            .save()
            .then((lesson) => {
                const dateTime = moment(time).format("YYYY-MM-DDTHH:mm");
                addCalendar(user, title, dateTime);

                Channel.findOne({ googleId: choreographerID }).then((channel) => {
                    if (!channel) {
                        const ch_name = choreographerID;
                        createChannel(req, res, ch_name);
                    }
                });

                const text = `
                <p>レッスンの登録、誠にありがとうございます！</p>
                <p>▼登録内容▼</p>
                <p>--------------------------------------------</p>
                <p>${lesson.title}</p>
                <a href="/reservation/<%= lesson.id %>">
                <img src="data:image/<%=lesson.thumbnail.contentType%>;base64, <%=lesson.thumbnail.data.toString('base64')%>" alt="thumbnail">
                </a>
                <p>日時：${dateTime}</p>
                <p>価格：${lesson.price} Yen</p>
                <p>${lesson.level[0]} | ${lesson.genre[0]} | ${lesson.mood[0]}</p>
                <p>--------------------------------------------</p>`;

                sendMail(user.email, "レッスンの登録を受付いたしました！", text);

                req.flash("success_msg", res.__("msg.success.schedule"));
                res.redirect(`/lesson/edit/${lesson._id}`);
            })
            .catch((err) => console.log(err));
    }
    Lesson.updateMany({}, {
            $addToSet: {
                level: ["any"],
                genre: ["any"],
                mood: ["any"],
            },
        },
        (err, result) => {
            console.log(err || result);
        }
    );
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;