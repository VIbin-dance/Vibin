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
    language: {
        type: String,
        required: true,
        enum: ["any", "Japanese", "English"]
    },
    level: {
        type: String,
        required: true,
        enum: ["any", "Beginner", "Intermediate", "Advanced"]
    },
    thumbnail: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true,

    },
    purpose: {
        type: Array,
        required: true
    },
    length: {
        type: String,
        required: true,
        enum: ["5-10", "10-30", "30-60", "60<"]
    },
    mood: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;