const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const LessonSchema = new mongoose.Schema({
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
    language: {
        type: Array,
        required: true,
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

LessonSchema.plugin(mongoosePaginate);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;