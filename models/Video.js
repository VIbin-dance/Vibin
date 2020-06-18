const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    choreographer: {
        type: String,
        require: true
    },
    url: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Advanced"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;