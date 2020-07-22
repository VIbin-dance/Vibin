const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
    id: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    language: {
        type: Array,
        required: true,
    },
    level: {
        type: Array,
        required: true,
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
        type: Array,
        required: true,
    },
    lengthCat: {
        type: Array,
        required: true,
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

VideoSchema.plugin(mongoosePaginate);

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;