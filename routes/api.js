const express = require("express");
const router = express.Router();
const passport = require("passport");

const Lesson = require("../models/Lesson");

router.get('/update-archive', (req, res) => {

    const body = {
        "version": "0",
        "id": "12345678-1a23-4567-a1bc-1a2b34567890",
        "detail-type": "IVS Recording State Change",
        "source": "aws.ivs",
        "account": "123456789012",
        "time": "2020-06-23T20:12:36Z",
        "region": "us-west-2",
        "resources": ["arn:aws:ivs:us-west-2:123456789012:channel/AbCdef1G2hij"],
        "detail": {
            "channel_name": "Your Channel",
            "stream_id": "st-1F6jDj0t3zV01cXKe5dScIJ",
            "recording_status": "Recording Start",
            "recording_status_reason": "",
            "recording_s3_bucket_name": "r2s3-dev-channel-1-recordings",
            "recording_s3_key_prefix": "ivs/123456789012/AbCdef1G2hij/2020-06-23T20-12-32.152Z/a1B2345cdeFg"
        }
    }

    const archiveURL = "https://vibin-archive.s3.amazonaws.com/" + body.detail.recording_s3_key_prefix + "/media/hls/master.m3u8"
    console.log(archiveURL);

    Lesson.findByIdAndUpdate(objectID to lesson, { archiveURL: archiveURL }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, ls) => {
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