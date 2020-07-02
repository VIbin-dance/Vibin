const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

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

// callback function
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
      level[i] = result.docs[i].level;
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

router.get('/results', ensureAuthenticated, (req, res) => res.render('results'));

router.get('/calendar', (req, res) => {
  res.render('calendar', {
    API_key: process.env.API_key,
    CLIENT_ID: process.env.CLIENT_ID
  });
});

router.get('/upload', ensureAuthenticated, (req, res) => {
  if (req.user.emails[0].value == '925shota@gmail.com' || req.user.emails[0].value == 'so.gorman@vibin.tokyo') {
    res.render('upload', {
      API_key: process.env.API_key,
      CLIENT_ID: process.env.CLIENT_ID
    });
  } else {
    req.flash('error_msg', "Sorry this is not yet available to users!");
    res.redirect('/dashboard?page=1&limit=15');
  }
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

router.post('/dashboard', (req, res) => {
  const { length, language, level, genre, purpose, mood } = req.body;
  let errors = [];

  const query = {
    $and: [
      { length: length },
      { language: language },
      { level: level },
      { genre: genre },
      { purpose: purpose },
      { mood: mood }
    ]
  }

  Video.paginate(query, { page: req.query.page, limit: req.query.limit }, (err, result) => {
    const title = [];
    const choreographer = [];
    const url = [];
    const level = [];
    const thumbnail = [];
    const id = [];

    if (!result.docs.length) {
      errors.push({ msg: 'There is no such video!' });
    }

    if (errors.length > 0) {
      req.flash('error_msg', "Looks like we don't have that video yet!");
      res.redirect('/dashboard?page=1&limit=15');
    } else {
      for (let i = 0; i < result.docs.length; i++) {
        title[i] = result.docs[i].title;
        choreographer[i] = result.docs[i].choreographer;
        url[i] = result.docs[i].url;
        level[i] = result.docs[i].level;
        thumbnail[i] = result.docs[i].thumbnail;
        id[i] = result.docs[i].id;
      }
      res.render('../views/results', {
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

router.post('/upload', (req, res) => {
  const { title, choreographer, thumbnail, url, id, publishedDate, length, language, level, genre, purpose, mood } = req.body;
  let errors = [];

  // Check required fields
  if (title == '' || choreographer == '' || thumbnail == '' || url == '' || id == '' || publishedDate == '' || length == '' || language == '' || level == '' || genre == '' || purpose == '' || mood == '') {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('upload', { errors, API_key: process.env.API_key, CLIENT_id: process.env.CLIENT_id, title, choreographer, thumbnail, url, id, publishedDate, length, language, level, genre, purpose, mood });
  } else {
    Video.findOne({ url: url })
      .then(video => {
        if (video) {
          errors.push({ msg: 'The video is already registered!' });
          res.render('upload', {
            errors
          });
        } else {
          const newVideo = new Video({ title, choreographer, thumbnail, url, id, publishedDate, length, language, level, genre, purpose, mood });
          newVideo.save()
            .then(function (video) {
              req.flash('success_msg', 'The dance is now registered');
              res.redirect('/dashboard?page=1&limit=15');
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