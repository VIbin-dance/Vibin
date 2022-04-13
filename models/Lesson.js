const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    language: {
        type: Array,
        required: false,
    },
    choreographerID: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
    },
    time: {
        type: Date,
        require: true,
    },
    level: {
        type: Array,
        required: true,
    },
    genre: {
        type: Array,
        required: true,
    },
    purpose: {
        type: Array,
        required: false
    },
    mood: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    archiveURL: {
        type: String
    }
});

LessonSchema.plugin(mongoosePaginate);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;