const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    lesson_Id: {
        type: String,
        require: true,
        unique: true
    },
    lesson_name: {
        type: String,
        require: true
    },
    techerGoogleId: {
        type: String,
        require: true
    },
    genre: {
        type: Array,
        require: true
    },
    purpose: {
        type: Array,
        require: true
    },
    mood: {
        type: Array,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
