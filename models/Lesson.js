const mongoose = require('mongoose');

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
        required: true,
    },
    choreographer: {
        type: Array,
        require: true
    },
    choreographerID: {
        type: String,
        require: true
    },
    price: {
        type: Number,
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
        required: true
    },
    mood: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;