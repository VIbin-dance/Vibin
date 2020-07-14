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
    res.redirect('/dashboard?page=1&limit=15');
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
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/calendar'
  ]
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error',
    session: true
  }),
  (req, res) => {
    req.flash('success_msg', 'You are logged in!')
    res.redirect('/dashboard?page=1&limit=15');
  }
);

router.get('/error', (req, res) => {
  res.send('Login error');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Video.paginate({}, { page: req.query.page, limit: req.query.limit }, (err, result) => {
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
  });
});

router.post('/dashboard', (req, res) => {
  const { lengthCat, language, level, genre, purpose, mood } = req.body;

  const query = {
    $and: [
      { lengthCat: lengthCat },
      { language: language },
      { level: level },
      { genre: genre },
      { purpose: purpose },
      { mood: mood }
    ]
  }

  Video.paginate(query, { page: req.query.page, limit: 100 }, (err, result) => {
    let title = [];
    let choreographer = [];
    let url = [];
    let level = [];
    let thumbnail = [];
    let id = [];

    if (!result.docs.length) {
      req.flash('error_msg', "Looks like we don't have that video yet!");
      res.redirect('/dashboard?page=1&limit=15');
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
  Video.find({ choreographer: req.params.id }, (err, result) => {
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

router.post('/calendar', (req, res) => {
  const { idCal } = req.body;
  let errors = [];

  User.findOne({ email: req.user._json.email }, (err, user) => {
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events/${idCal}?key=${process.env.API_key}`, {
      'method': 'DELETE',
      'headers': JSON.stringify({
        'Authorization': `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (errors.length > 0) {
          res.render('player', { errors, title: result.title, choreographer: result.choreographer, id: id, level: result.level });
        }
        else {
          req.flash('success_msg', 'The dance is now deleted');
          res.redirect('/calendar');
        }
      })
      .catch(err => console.log(err));
  })
})

router.get('/player/:id', ensureAuthenticated, (req, res) => {
  Video.findOne({ id: req.params.id }, (err, result) => {
    res.render('player', {
      id: req.params.id,
      title: result.title,
      choreographer: result.choreographer,
      level: result.level,
    });
  })
});

router.post('/player/:id', (req, res) => {
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
            res.render('player', { errors, title: result.title, choreographer: result.choreographer, id: id, level: result.level });
          }
          else {
            req.flash('success_msg', 'The dance is now scheduled');
            res.redirect('/calendar');
          }
        })
    })
  })
})

router.get('/upload', ensureAuthenticated, onlyDevs, (req, res) => {
  res.render('upload', {
    API_key: process.env.API_key,
  });
})

router.post('/upload', (req, res) => {
  const { title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood } = req.body;
  let errors = [];

  // Check required fields
  if (title == '' || choreographer == '' || thumbnail == '' || url == '' || id == '' || publishedDate == '' || length == '' || lengthCat == '' || language == '' || level == '' || genre == '' || purpose == '' || mood == '') {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('upload', { errors, API_key: process.env.API_key, CLIENT_id: process.env.CLIENT_id, title, choreographer, thumbnail, url, id, publishedDate, length, lengthCat, language, level, genre, purpose, mood });
  } else {
    Video.findOne({ url: url })
      .then(video => {
        if (video) {
          errors.push({ msg: 'The video is already registered!' });
          res.render('upload', {
            errors, API_key: process.env.API_key
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

module.exports = router;