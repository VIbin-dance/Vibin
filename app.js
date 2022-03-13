const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const paginate = require('express-paginate');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression');
const minify = require('express-minify');
require('newrelic');
const cors = require('cors');
var logger = require('morgan');
const socketio = require('socket.io');
const { I18n } = require('i18n');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const User = require('./models/User');
const {
    formatMsg,
    userJoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers,
    createLiveTime,
    closeLive,
    getCurrentLivetime
} = require('./config/chat');

const app = express();
const Server = http.createServer(app);

const io = socketio(Server);
// const io = socketio(Server, {
//     cors: {
//         origin: "https://vibin.tokyo",
//         methods: ["GET", "POST"],
//         transports: ['websocket', 'polling'],
//         credentials: true
//     },
//     allowEIO3: true
// });

app.use(cors());
// require('newrelic');
// app.use(logger('dev'));

app.use(helmet());
app.use(compression());
app.use(minify());
app.use(express.static(path.join(__dirname + '/public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSIN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MongoURI })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
        if (profile) {
            User.findOne({ googleId: profile.id }, async(err, user) => {
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
                        if (err) {
                            return done(err, false, {
                                message: err
                            });
                        } else {
                            return done(null, profile);
                        }
                    })
                } else {
                    return done(null, false);
                }
            });
        } else {
            return done(null, false);
        }
    }
));

// Connect to Mongo
const db = process.env.MongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB ~~ connected... !!!'))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// live chating middleware with client connects
io.on("connection", (socket) => {
    // user's login - run when start live page & chat room
    socket.on('joinRoom', (user_infor) => {
        const { u_name, room_id, ch_arn } = user_infor;
        // user connect register user list
        const connect_user = userJoin(socket.id, u_name, room_id);

        socket.join(connect_user.roomId);

        // welcome message
        socket.emit("client_message", formatMsg("bot", "https://img.icons8.com/pastel-glyph/2x/person-male.png", "チャットへようこそ!"));

        // set and get live time
        let live_time = 0;
        // console.log("channel user's : " + getRoomUsers(connect_user.roomId) + " ( id : " + connect_user.roomId + " )");

        if (getRoomUsers(connect_user.roomId) == 1) {
            live_time = Math.floor(Date.now() / 1000);
            createLiveTime(connect_user.roomId, live_time);
        } else {
            live_time = getCurrentLivetime(connect_user.roomId).ch_time;
        }

        // send user numbers and room info
        io.to(connect_user.roomId).emit("channel_users", {
            room_id: connect_user.roomId,
            user_counts: getRoomUsers(connect_user.roomId)
        });
        socket.emit("channel_time", {
            live_time: live_time
        });
    });

    // listen for user's chat msg
    socket.on("server_message", (data) => {
        const send_user = getCurrentUser(socket.id);

        const { user_name, user_photo, chat_msg } = data;
        io.to(send_user.roomId).emit("client_message", formatMsg(user_name, user_photo, chat_msg));
    })

    // run when client disconnect
    socket.on("disconnect", () => {
        const leave_user = userLeaves(socket.id);

        if (leave_user) {
            // io.to(leave_user.roomId).emit("client_message", formatMsg("Admin", "http://localhost:5000/assets/img/profile/user03.png", "A user has left the chat"));

            io.to(leave_user.roomId).emit("user_counts", {
                room_id: leave_user.roomId,
                user_counts: getRoomUsers(leave_user.roomId)
            });

            // delete liveTime, if user's count is 0
            if (getRoomUsers(leave_user.roomId) == 0) {
                closeLive(leave_user.roomId);
                // console.log("live closed...");
            }
        }
    })
})

app.use(paginate.middleware(10, 50))

const i18n = new I18n({
    locales: ['en', 'ja'],
    directory: path.join(__dirname, '/locales'),
    objectNotation: true
})

app.use(i18n.init);

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/lesson', require('./routes/lesson'));
app.use('/company', require('./routes/company'));
app.use('/page', require('./routes/page'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

Server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});