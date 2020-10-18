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
    userPhotoDef: {
        data: Buffer,
        originalname: String,
        contentType: String
    },
    loginCount: {
        type: Number,
        require: true,
        default: 0
    },
    userPhoto: {
        type: String,
        require: true
    },
    name: {
        familyName: {
            type: String,
            require: true
        },
        givenName: {
            type: String,
            require: true
        }
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
    },
    follower: {
        type: Array,
        require: false,
    },
    tags: {
        level: {
            type: String,
            require: false
        },
        purpose: {
            type: String,
            require: false
        },
        genre: {
            type: Array,
            require: false
        }
    },
    bio: {
        type: String,
        require: false,
    },
    like: [{
        id: {
            type: String,
            require: false
        },
        date: {
            type: Date,
            default: Date.now
        },
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
