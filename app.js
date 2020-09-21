const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const paginate = require('express-paginate');
const passport = require('passport');
const helmet = require('helmet');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/User');

const app = express();
// require('newrelic');
require('dotenv').config();

app.use(helmet());
app.use(express.static(path.join(__dirname + '/public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSIN_SECRET,
    resave: false,
    httpOnly: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

app.use(passport.initialize());
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
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
    (accessToken, refreshToken, profile, done) => {
        if (profile) {
            User.findOne({ googleId: profile.id }, async (err, user) => {
                if (user == null || user.loginCount == null || user.loginCount == 0) {
                    User.findOneAndUpdate({ googleId: profile.id }, {
                        $set: {
                            loginCount: 1,
                            username: profile.displayName,
                            email: profile.emails[0].value,
                            name: { familyName: profile.name.familyName, givenName: profile.name.givenName },
                            userPhoto: profile.photos[0].value,
                            googleId: profile.id,
                            accessToken: accessToken
                        }
                    }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, user) => {
                        if (err) {
                            return done(err, false, {
                                message: err
                            });
                        } else {
                            return done(null, profile);
                        }
                    })
                } else if (user.loginCount > 0) {
                    User.findOneAndUpdate({ googleId: profile.id }, {
                        $set: {
                            googleId: profile.id,
                            accessToken: accessToken,
                            loginCount: user.loginCount + 1,
                        }
                    }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, user) => {
                        console.log(user.loginCount);
                        if (err) {
                            return done(err, false, {
                                message: err
                            });
                        } else {
                            return done(null, profile);
                        }
                    })
                }
                // User.findOneAndUpdate({
                //     googleId: profile.id
                // }, {
                //     loginCount: loginCount + 1,
                //     username:  profile.displayName,
                //     email:  profile.emails[0].value,
                //     name: { familyName: profile.name.familyName, givenName: profile.name.givenName },
                //     userPhoto: profile.photos[0].value,
                //     googleId: profile.id,
                //     accessToken: accessToken
                // }, {upsert: true, new: true, setDefaultsOnInsert: true }, (err, user)  => {
                //     console.log(user)
                //     if (err) {
                //         return done(err, false, {
                //             message: err
                //         });
                //     } else {
                //         return done(null, profile);
                //     }
                // });
                else {
                    return done(null, false);
                }
            })
        }
    }));

const db = process.env.MongoURI;

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
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});