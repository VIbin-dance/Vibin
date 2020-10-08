const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const passport = require('passport');
const fetch = require('node-fetch');
const moment = require('moment');
const { ensureAuthenticated } = require('../config/auth');
const { onlyDevs } = require('../config/dev');

const Video = require('../models/Video');
const User = require('../models/User');

router.get('/', (req, res) => {
  if (req.session.passport) {
    req.flash('success_msg', 'You are logged in!');
    res.redirect('/dashboard/-1?page=1&limit=15');
  } else {
    res.render('landing')
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/calendar.events'
  ]
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error',
    session: true
  }),
  async (req, res) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();
    if (user.loginCount == 1) {
      req.flash('success_msg', 'Welcome! Tell us a little bit about you!')
      res.redirect('/users/preference');
    } else {
      req.flash('success_msg', 'You are logged in!')
      res.redirect('/dashboard/-1?page=1&limit=15');
    }
  }
);

router.get('/error', (req, res) => {
  res.send('Login error');
});

router.get('/privacy-policy', (req, res) => res.render('privacy-policy'));
router.get('/terms-of-service', (req, res) => res.render('terms-of-service'));

router.get('/dashboard/:sort', ensureAuthenticated, (req, res) => {
  User.findOne({ email: req.user._json.email }, async (err, user) => {
    const limit = 12;

    let query = {
      $and: [
        { level: user.tags.level },
        { genre: user.tags.genre[0] },
        { purpose: user.tags.purpose }
      ]
    }

    if (user.tags.level == undefined) {
      const level = ["Beginner", "Intermediate", "Advanced"]
      const randomLevel = level[Math.floor(Math.random() * level.length)]

      query.$and[0].level = randomLevel;
    }

    if (user.tags.genre[0] == undefined) {
      const genre = ["Hip Hop", "Locking", "Jazz", "Breakin", "House", "Popping", "K-POP", "Tiktok"]
      const randomGenre = genre[Math.floor(Math.random() * genre.length)]

      query.$and[1].genre = randomGenre;
    }

    if (user.tags.purpose == undefined) {
      const purpose = ["Skill Improvements", "Health and Exercise", "Entertainment"]
      const randomPurpose = purpose[Math.floor(Math.random() * purpose.length)]

      query.$and[2].purpose = randomPurpose;
    }

    console.log(query);

    let countRec = await Video.find(query).exec();

    console.log(countRec.length);

    if (countRec.length < 12) {
      query = {
        $or: [
          { level: query.$and[0].level },
          { genre: query.$and[1].genre },
          { purpose: query.$and[2].purpose }
        ]
      }

      countRec = await Video.find(query).exec();
    }

    const recUser = await User.find({ "tags.genre" : user.tags.genre[0] }, null, { limit: 3 }).exec();

    Video.paginate({}, { page: req.query.page, limit: req.query.limit, sort: { publishedDate: req.params.sort } }, async (err, result) => {

      const max = countRec.length - limit;
      const skip = Math.floor(Math.random() * max);

      const options = {
        sort: { publishedDate: -1 },
        limit: limit,
        skip: skip
      };

      Video.find(query, null, options, (err, resultRec) => {
        const titleRec = [];
        const choreographerRec = [];
        const urlRec = [];
        const levelRec = [];
        const thumbnailRec = [];
        const idRec = [];

        for (let i = 0; i < resultRec.length; i++) {
          titleRec[i] = resultRec[i].title;
          choreographerRec[i] = resultRec[i].choreographer;
          urlRec[i] = resultRec[i].url;
          levelRec[i] = resultRec[i].level;
          thumbnailRec[i] = resultRec[i].thumbnail;
          idRec[i] = resultRec[i].id;
        }

        const title = [];
        const choreographer = [];
        const url = [];
        const level = [];
        const thumbnail = [];
        const id = [];

        for (let i = 0; i < result.docs.length; i++) {
          title[i] = result.docs[i].title;
          choreographer[i] = result.docs[i].choreographer;
          url[i] = result.docs[i].url;
          level[i] = result.docs[i].level[0];
          thumbnail[i] = result.docs[i].thumbnail;
          id[i] = result.docs[i].id;
        }
        res.render('dashboard', {
          recUser: recUser,
          user: user,
          userPhoto: user.userPhoto,
          userPhotoDef: user.userPhotoDef,
          count: result.total,
          username: user.username,
          videos: result.docs,
          videosRec: resultRec,
          title: title,
          titleRec: titleRec,
          choreographer: choreographer,
          choreographerRec: choreographerRec,
          url: url,
          urlRec: urlRec,
          id: id,
          idRec: idRec,
          level: level,
          levelRec: levelRec,
          thumbnail: thumbnail,
          thumbnailRec: thumbnailRec,
          currentSort: req.params.sort,
          currentPage: result.page,
          pageCount: result.pages,
          pages: paginate.getArrayPages(req)(3, result.pages, req.query.page)
        })
      });
    })
  })
});

router.post('/dashboard', ensureAuthenticated, (req, res) => {
  const { lengthCat, language, level, genre, purpose, mood, search } = req.body;

  const searchQuery = new RegExp(escapeRegex(search), 'gi');

  const query = {
    $and: [
      { lengthCat: lengthCat },
      { language: language },
      { level: level },
      { genre: genre },
      { purpose: purpose },
      { mood: mood }
    ],
    $or: [
      { title: searchQuery },
      { choreographer: searchQuery }
    ]
  }

  Video.paginate(query, { page: req.query.page, limit: 100 }, async (err, result) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();
    let title = [];
    let choreographer = [];
    let url = [];
    let level = [];
    let thumbnail = [];
    let id = [];

    if (!result.docs.length) {
      req.flash('error_msg', "Looks like we don't have that video yet!");
      res.redirect('/dashboard/-1?page=1&limit=15');
    } else {
      for (let i = 0; i < result.docs.length; i++) {
        title[i] = result.docs[i].title;
        choreographer[i] = result.docs[i].choreographer;
        url[i] = result.docs[i].url;
        level[i] = result.docs[i].level[0];
        thumbnail[i] = result.docs[i].thumbnail;
        id[i] = result.docs[i].id;
      }
      res.render('results', {
        userPhoto: user.userPhoto,
        userPhotoDef: user.userPhotoDef,
        count: result.total,
        username: req.session.passport.user.displayName,
        videos: result.docs,
        title: title,
        choreographer: choreographer,
        url: url,
        id: id,
        level: level,
        thumbnail: thumbnail,
        currentPage: result.page,
        pageCount: result.pages,
        pages: paginate.getArrayPages(req)(3, result.pages, req.query.page)
      })
    }
  })
})

router.get('/results', ensureAuthenticated, (req, res) => res.render('results'));

router.get('/choreographer/:id', ensureAuthenticated, (req, res) => {
  Video.find({ choreographer: req.params.id }, async (err, result) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();
    const title = [];
    const url = [];
    const level = [];
    const thumbnail = [];
    const id = [];
    for (let i = 0; i < result.length; i++) {
      title[i] = result[i].title;
      url[i] = result[i].url;
      level[i] = result[i].level;
      thumbnail[i] = result[i].thumbnail;
      id[i] = result[i].id;
    }
    res.render('choreographer', {
      userPhoto: user.userPhoto,
      userPhotoDef: user.userPhotoDef,
      count: result.length,
      choreographer: req.params.id,
      videos: result,
      title: title,
      url: url,
      level: level,
      thumbnail: thumbnail,
      id: id,
    })
  })
})

router.get('/calendar', ensureAuthenticated, (req, res) => {
  User.findOne({ email: req.user._json.email }, (err, user) => {

    let time = encodeURIComponent(moment().format());
    let summary = [];
    let dateTime = [];
    let id = [];
    let idCal = [];

    fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?orderBy=startTime&q=vibin&singleEvents=true&timeMin=${time}&key=${process.env.API_key}`, {
      'headers': { 'Authorization': `Bearer ${user.accessToken}` },
    })
      .then(response => response.json())
      .then(data => {
        for (i = 0; i < data.items.length; i++) {
          summary[i] = data.items[i].summary
          dateTime[i] = moment(data.items[i].start.dateTime).format('MMMM Do YYYY, h:mm a');
          id[i] = data.items[i].description
          idCal[i] = data.items[i].id
        }
        res.render('calendar', {
          userPhoto: user.userPhoto,
          userPhotoDef: user.userPhotoDef,
          count: data.items.length,
          API_key: process.env.API_key,
          CALENDAR_ID: user.email,
          accessToken: user.accessToken,
          summary: summary,
          dateTime: dateTime,
          id: id,
          idCal: idCal
        });
      })
  })
});

router.post('/calendar', ensureAuthenticated, (req, res) => {
  User.findOne({ email: req.user._json.email }, (err, user) => {

    const { idCal } = req.body;

    let result = fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events/${idCal}?key=${process.env.API_key}`, {
      'method': 'DELETE',
      'headers': { 'Authorization': `Bearer ${user.accessToken}`, 'Accept': 'application/json' }
    })

    result.then(function (result) {
      if (result.status == 404) {
        req.flash('error', 'The video does not exist');
        res.redirect('/calendar');
      } else if (result.status == 200 || 204) {
        req.flash('success_msg', 'The dance is now deleted');
        res.redirect('/calendar');
      }
    })
  })
});

router.get('/player/:id', (req, res) => {
  Video.findOne({ id: req.params.id }, async (err, result) => {
    const user = await User.findOne({ email: req.user._json.email }).exec();
    if (result == null) {
      req.flash('error_msg', 'The video is either deleted or modified!');
      res.redirect('/dashboard?page=1&limit=15');
    } else {
      res.render('player', {
        userPhoto: user.userPhoto,
        userPhotoDef: user.userPhotoDef,
        id: req.params.id,
        title: result.title,
        choreographer: result.choreographer,
        level: result.level,
      });
    }
  })
});

router.post('/player/:id', ensureAuthenticated, (req, res) => {
  const { id, date, time } = req.body;
  let errors = [];

  Video.findOne({ id: id }, (err, result) => {
    User.findOne({ email: req.user._json.email }, (err, user) => {
      fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?key=${process.env.API_key}`, {
        'method': 'POST',
        'headers': {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'end': {
            'dateTime': date + ":00",
            'timeZone': 'Asia/Tokyo'
          },
          'start': {
            'dateTime': date + ":00",
            'timeZone': 'Asia/Tokyo'
          },
          'summary': result.title + " Vibin'",
          "description": id,
          "reminders": {
            "useDefault": false,
            "overrides": [
              {
                "method": "email",
                "minutes": 30
              }
            ]
          }
        })
      })
        .then(response => response.json())
        .then(data => {
          if (date == '') {
            errors.push({ msg: 'Please fill in all fields' });
          }

          if (errors.length > 0) {
            res.render('player', { errors, userPhoto: req.session.passport.user.photos[0].value, title: result.title, choreographer: result.choreographer, id: id, level: result.level });
          }
          else {
            req.flash('success_msg', 'The dance is now scheduled');
            res.redirect('/calendar');
          }
        })
    })
  })
})

router.get('/upload', ensureAuthenticated, onlyDevs, async (req, res) => {
  const user = await User.findOne({ email: req.user._json.email }).exec();
  res.render('upload', {
    userPhoto: user.userPhoto,
    userPhotoDef: user.userPhotoDef,
    API_key: process.env.API_key,
  });
})

router.post('/upload', (req, res) => {
  const { title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood } = req.body;
  let errors = [];

  // Check required fields
  if (title == '' || choreographer == '' || thumbnail == '' || url == '' || id == '' || publishedDate == '' || length == '' || lengthCat == '' || language == '' || level == undefined || genre == undefined || purpose == undefined || mood == undefined) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('upload', { errors, userPhoto: req.session.passport.user.photos[0].value, API_key: process.env.API_key, CLIENT_id: process.env.CLIENT_id, title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood });
  } else {
    Video.findOne({ url: url })
      .then(video => {
        if (video) {
          errors.push({ msg: 'The video is already registered!' });
          res.render('upload', {
            errors, userPhoto: req.session.passport.user.photos[0].value, API_key: process.env.API_key
          });
        } else {
          const newVideo = new Video({ title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood });
          newVideo.save()
            .then(function (video) {
              req.flash('success_msg', 'The dance is now registered');
              res.redirect('/upload');
            })
            .catch(err => console.log(err));
        }
      })
  }
  Video.updateMany(
    {},
    {
      $addToSet: {
        length: ["any"],
        language: ["any"],
        level: ["any"],
        lengthCat: ["any"],
        genre: ["any"],
        purpose: ["any"],
        mood: ["any"]
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
})

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;