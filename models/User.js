const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    name: {
        familyName: {
            type: String,
            require: true },
        givenName: {
            type: String,
            require: true }
        },
    accessToken: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    subscription: {
        type: Boolean,
        require: false
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
