const express = require('express');
const router = express.Router();
const async = require('async');
const paginate = require('express-paginate');

const Video = require('../models/Video');

router.get('/', (req, res) => res.render('landing'));

router.get('/dashboard', (req, res) => {
  Video.paginate({}, {page: req.query.page, limit: req.query.limit}, (err, result) => {
    const title = [];
    const choreographer = [];
    const url = [];
    const level = [];
    const thumbnail = [];
    for (let i = 0; i < result.docs.length; i++) {
      title[i] = result.docs[i].title;
      choreographer[i] = result.docs[i].choreographer;
      url[i] = result.docs[i].url;
      level[i] = result.docs[i].level;
      thumbnail[i] = result.docs[i].thumbnail;
    }
    res.render('dashboard', {
      videos: result.docs,
      title: title,
      choreographer: choreographer,
      url: url,
      level: level,
      thumbnail: thumbnail,
      currentPage: result.page,
      pageCount: result.pages,
      pages: paginate.getArrayPages(req)(3, result.pages, req.query.page)
    });
  });

  // Video.find({}, (err, results) => {
  //   let resultsTitle = results.map(results => results.title);
  //   let resultsChoreo = results.map(results => results.choreographer);
  //   let resultsURL = results.map(results => results.url);
  //   let resultsLevel = results.map(results => results.level);
  //   let resultsThumbnail = results.map(results => results.thumbnail);
  //   res.render('dashboard', {
  //     title: resultsTitle,
  //     choreographer: resultsChoreo,
  //     url: resultsURL,
  //     level: resultsLevel,
  //     thumbnail: resultsThumbnail,
  //     results: results
  //   })
  // })
});

router.get('/results', (req, res) => res.render('results'));
router.get('/upload', (req, res) => res.render('upload', {
  API_key: process.env.API_key,
  CLIENT_id: process.env.CLIENT_id
}));

router.get('/player', (req, res) => res.render('player'));

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

  Video.find(query, (err, results) => {
    if (!results.length) {
      errors.push({ msg: 'There is no such video!' });
      res.render('dashboard', { errors });
    } else {
      let resultsTitle = results.map(results => results.title);
      let resultsChoreo = results.map(results => results.choreographer);
      let resultsURL = results.map(results => results.url);
      let resultsLevel = results.map(results => results.level);
      let resultsThumbnail = results.map(results => results.thumbnail);
      res.render('results', {
        title: resultsTitle,
        choreographer: resultsChoreo,
        url: resultsURL,
        level: resultsLevel,
        thumbnail: resultsThumbnail,
        results: results
      })
    }
  })
})

router.post('/upload', (req, res) => {
  const { title, choreographer, thumbnail, url, publishedDate, length, language, level, genre, purpose, mood } = req.body;
  let errors = [];

  // Check required fields
  if (title == '' || choreographer == '' || thumbnail == '' || url == '' || publishedDate == '' || length == '' ||  language == '' || level == '' || genre == '' || purpose == '' || mood == '') {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('upload', { errors, title, choreographer, thumbnail, url, publishedDate, length, language, level, genre, purpose, mood });
  } else {
    Video.findOne({ url: url })
      .then(video => {
        if (video) {
          errors.push({ msg: 'The video is already registered!' });
          res.render('upload', {
            errors
          });
        } else {
          const newVideo = new Video({ title, choreographer, thumbnail, url, publishedDate, length, language, level, genre, purpose, mood });
          newVideo.save()
            .then(function (video) {
              req.flash('success_msg', 'The dance is now registered');
              res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
        }
      })
  }
  Video.updateMany(
    {},
    { $addToSet: {
      length: ["any"],
      language: ["any"],
      level: ["any"],
      genre: ["any"],
      purpose: ["any"],
      mood: ["any"]
    } },
    function(err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
})

module.exports = router;