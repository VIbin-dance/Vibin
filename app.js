const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const paginate = require('express-paginate');
const passport = require('passport');
const helmet = require('helmet');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/User');

const app = express();
require('dotenv').config();

app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(passport.initialize());

app.use(session({
    secret: process.env.SESSIN_SECRET,
    resave: false,
    httpOnly: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Oauthログイン
// データベースに保存
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_id,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
(accessToken, refreshToken, profile, done) => {
    if (profile) {
        User.findOneAndUpdate({
            googleId: profile.id
        }, {
            username:  profile.displayName,
            email:  profile.emails[0].value,
            name: { familyName: profile.name.familyName, givenName: profile.name.givenName },
            googleId: profile.id,
            accessToken: accessToken
        }, {upsert: true, new: true, setDefaultsOnInsert: true }, (err, user)  => {
            if (err) {
                return done(err, false, {
                    message: err
                });
            } else {
                return done(null, profile);
            }
        });
    } else {
        return done(null, false);
    }
}
));

const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(paginate.middleware(10, 50))

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started on ' + port );
});