const express = require("express");
const router = express.Router();
const moment = require("moment");
const { ensureAuthenticated } = require("../config/auth");
const { checkSession } = require("../config/session");
const { uploadObject } = require("../config/aws/s3");
const Aws = require("aws-sdk");
const multer = require("multer");
const sharp = require("sharp");
const stripe = require("stripe")(process.env.stripekey);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const User = require("../models/User");
const Lesson = require("../models/Lesson");

findLesson = (id) => {
    return Lesson.find({ choreographerID: id }, null, {
        sort: { time: -1 },
    }).lean();
};

findTicket = (id) => {
    return Lesson.find({ _id: { $in: id } }, null, { sort: { time: -1 } }).lean();
};

findUser = (id) => {
    return User.findOne({ _id: id }).lean();
};

// router.get("/register", (req, res) => res.render("register"));
// router.get("/login", (req, res) => res.render("login"));

router.get("/register", (req, res) => {
    res.render("lp/signup", {
        layout: false
    });
})

router.get("/login", (req, res) => {
    res.render("lp/signin", {
        layout: false
    });
})


router.get("/profile", checkSession, ensureAuthenticated, async (req, res) => {
    const [lesson, tickets] = await Promise.all([
        findLesson(user._id),
        findTicket(user.lesson),
    ]);

    const choreographer = [];

    if (user.lesson) {
        for (let i = 0; i < user.lesson.length; i++) {
            choreographer[i] = await User.findOne({ _id: tickets[i].choreographerID },
                "username userPhoto"
            )
                .lean()
                .exec();
        }
    }

    res.render("profile", {
        username: user.username,
        bio: user.bio,
        userPhoto: user.userPhoto,
        website: user.website,
        email: user.email,
        lesson: lesson,
        tickets: tickets,
        choreographer: choreographer,
        moment: moment,
    });
});

router.get("/profile/edit", checkSession, ensureAuthenticated, (req, res) => {
    if (!req.session.user) {
        req.flash("error_msg", res.__("msg.error.noUser"));
        res.redirect("/dashboard/-1?page=1&limit=15");
    } else {
        res.render("profileEdit", {
            bio: user.bio,
            website: user.website,
            userPhoto: user.userPhoto,
            email: user.email,
            tags: user.tags,
            username: user.username,
        });
    }
});

router.post("/profile/edit", ensureAuthenticated, upload.single("userPhoto"), async (req, res) => {
    const { username, bio, website, level, genre } = req.body;
    let errors = [];

    const query = {
        $set: {
            username: username,
            bio: bio,
            website: website,
            tags: { level: level, genre: genre },
        }
    };

    if (req.file) {
        const buffer = await sharp(req.file.buffer).webp().resize(400, 400).toBuffer();
        console.log(buffer);

        const params = {
            Bucket: process.env.PROFILE_BUCKET_NAME,
            Key: req.session.user._id,
            Body: buffer,
            ACL: "public-read-write",
            ContentType: "image/webp",
        };

        const userPhoto = await uploadObject(params);
        query.$set.userPhoto = userPhoto.Location
    }

    if (username == "") {
        errors.push({ msg: res.__("msg.error.username") });
    }

    if (errors.length > 0) {
        res.render("profileEdit", {
            errors,
            user: req.session.user,
            curUsername: req.session.user.username,
            bio,
            website,
            level,
            genre,
        });
    } else {
        const newProf = await User.findOneAndUpdate({ email: req.user._json.email }, query).lean().exec();
        User.findOne({ _id: req.session.user._id }, (err, user) => {
            req.session.user = user;
            req.flash("success_msg", res.__("msg.success.profile"));
            res.redirect("/users/profile");
        })
    }
});

// const createStripe = () => {
//     if (!user.stripeID) {
//         const account = await stripe.accounts.create({
//             country: 'JP',
//             type: 'express',
//             email: user.email,
//             capabilities: {
//                 card_payments: { requested: true },
//                 transfers: { requested: true },
//             },
//             business_type: 'individual',
//         });

//         const loginLink = await stripe.accountLinks.create({
//             account: account.id,
//             refresh_url: `https://vibin.tokyo/settings`,
//             return_url: `https://vibin.tokyo/settings`,
//             type: "account_onboarding",
//         });

//         User.findOneAndUpdate({ email: req.user._json.email }, { stripeID: account.id }, { upsert: true, new: true, setDefaultsOnInsert: true },
//             (err, user) => {
//                 console.log(err || user);
//                 req.session.user = user;
//             });
//     }
// }

// const checkStripe = () => {
//     if (!user.stripeID) {
//         const account = await stripe.accounts.create({
//             country: 'JP',
//             type: 'express',
//             email: user.email,
//             capabilities: {
//                 card_payments: { requested: true },
//                 transfers: { requested: true },
//             },
//             business_type: 'individual',
//         });

//         const loginLink = await stripe.accountLinks.create({
//             account: account.id,
//             refresh_url: `https://vibin.tokyo/create`,
//             return_url: `https://vibin.tokyo/create`,
//             type: "account_onboarding",
//         });

//         User.findOneAndUpdate({ email: req.user._json.email }, { stripeID: account.id }, { upsert: true, new: true, setDefaultsOnInsert: true },
//             (err, user) => {
//                 console.log(err || user);
//                 req.session.user = user;

//                 res.render('settings', {
//                     user: req.session.user,
//                     choreographer: user.username,
//                     account: account,
//                     loginLink: loginLink,
//                 })
//             });
//     } else {
//         const account = await stripe.accounts.retrieve(user.stripeID);
//         let loginLink;

//         if (account.capabilities.card_payments == 'active') {
//             loginLink = await stripe.accounts.createLoginLink(account.id);
//         } else {
//             loginLink = await stripe.accountLinks.create({
//                 account: account.id,
//                 refresh_url: `https://vibin.tokyo/settings`,
//                 return_url: `https://vibin.tokyo/settings`,
//                 type: "account_onboarding",
//             });
//         }

//         res.render('settings', {
//             user: req.session.user,
//             choreographer: user.username,
//             account: account,
//             loginLink: loginLink,
//         })
//     }
// }

router.get("/settings", checkSession, ensureAuthenticated, async (req, res) => {
    if (!user.stripeID) {
        const account = await stripe.accounts.create({
            country: 'JP',
            type: 'express',
            email: user.email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            business_type: 'individual',
        });

        const loginLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `https://vibin.tokyo/create`,
            return_url: `https://vibin.tokyo/create`,
            type: "account_onboarding",
        });

        User.findOneAndUpdate({ email: req.user._json.email }, { stripeID: account.id }, { upsert: true, new: true, setDefaultsOnInsert: true },
            (err, user) => {
                console.log(err || user);
                req.session.user = user;

                res.render('settings', {
                    user: req.session.user,
                    choreographer: user.username,
                    account: account,
                    loginLink: loginLink,
                })
            });
    } else {
        const account = await stripe.accounts.retrieve(user.stripeID);
        let loginLink;

        if (account.capabilities.card_payments == 'active') {
            loginLink = await stripe.accounts.createLoginLink(account.id);
        } else {
            loginLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: `https://vibin.tokyo/settings`,
                return_url: `https://vibin.tokyo/settings`,
                type: "account_onboarding",
            });
        }

        res.render('settings', {
            user: req.session.user,
            choreographer: user.username,
            account: account,
            loginLink: loginLink,
        })
    }

})

module.exports = router;