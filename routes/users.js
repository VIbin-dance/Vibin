const express = require("express");
const router = express.Router();
const moment = require("moment");
const { ensureAuthenticated } = require("../config/auth");
const { checkSession } = require("../config/session");
const { uploadObject } = require("../config/aws/s3");
const Aws = require("aws-sdk");
const multer = require("multer");
const sharp = require("sharp");

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

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));

router.get("/profile", checkSession, ensureAuthenticated, async(req, res) => {
    const [lesson, tickets] = await Promise.all([
        findLesson(user._id),
        findTicket(user.lesson),
    ]);

    const choreographer = [];

    if (user.lesson) {
        for (let i = 0; i < user.lesson.length; i++) {
            choreographer[i] = await User.findOne({ _id: tickets[i].choreographerID },
                    "username"
                )
                .lean()
                .exec();
        }
    }

    res.render("profile", {
        user: user,
        bio: user.bio,
        userPhoto: user.userPhoto,
        lesson: lesson,
        tickets: tickets,
        choreographer: choreographer,
        moment: moment,
    });
});

router.get("/profile/edit", ensureAuthenticated, (req, res) => {
    if (!req.session.user) {
        req.flash("error_msg", res.__("msg.error.noUser"));
        res.redirect("/dashboard/-1?page=1&limit=15");
    } else {
        res.render("profileEdit", {
            user: req.session.user,
            bio: req.session.user.bio,
            userPhoto: req.session.user.userPhoto,
            email: req.session.user.email,
            username: req.session.user.username,
        });
    }
});

router.post("/profile/edit", ensureAuthenticated, upload.single("userPhoto"), async(req, res) => {
    const { username, bio, level, genre } = req.body;
    let errors = [];

    const query = {
        $set: {
            username: username,
            bio: bio,
            tags: { level: level, genre: genre },
        }
    };

    if (req.file) {
        const buffer = await sharp(req.file.buffer).webp().resize(320, 320).toBuffer();
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
            level,
            genre,
        });
    } else {
        User.findOneAndUpdate({ email: req.user._json.email }, query, (err, user) => {
            req.session.user = user;
        }).lean();

        req.flash("success_msg", res.__("msg.success.profile"));
        res.redirect("/users/profile");
    }
});

module.exports = router;