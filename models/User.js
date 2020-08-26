const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
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
    following: {
        type: Array,
        require: false,
        unique: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
