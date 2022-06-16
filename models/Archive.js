const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: Object,
        data: Buffer,
        originalname: String,
        contentType: String,
        required: true
    },
    choreographerID: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true,
    },
    duration: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    archiveURL: {
        type: String
    }
});

const Archive = mongoose.model('Archive', ArchiveSchema);

module.exports = Archive;