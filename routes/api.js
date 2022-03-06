const express = require("express");
const router = express.Router();
const passport = require("passport");

const Lesson = require("../models/Lesson");

router.get('/update-archive', (req, res) => {
    console.log(req.body)

    Lesson.findByIdAndUpdate(req.body.detail.channel_name, { archiveURL: req.body.detial.recording_s3_key_prefix }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, ls) => {
        if (err) {
            res.status(500).json({
                status: '500 Internal Server Error',
                error: error,
            })
        }

        res.status(200).json({
            data: ls,
        })
    }).lean();
})

module.exports = router