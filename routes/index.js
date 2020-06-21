const express = require('express');
const router = express.Router();
const async = require('async');

const Video = require('../models/Video');

router.get('/', (req, res) => res.render('landing'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/results', (req, res) => res.render('results'));
router.get('/upload', (req, res) => res.render('upload'));

router.post('/dashboard', async (req, res) => {
  const { choreographer, length, language, level, genre, purpose, mood } = req.body;
  console.log(req.body);
  let errors = [];

  const query = {
    $and: [
      // { choreographer: choreographer },
      { length: length },
      { language: language },
      { level: level },
      { genre: genre },
      { purpose: purpose },
      { mood: mood }
    ]
  }

  // const results = await Video.find(query);

  // results.map(result => result.title);
  // console.log(result.title);

  Video.find(query, (err, results) => {
    console.log(results);
    if (!results.length) {
      errors.push({ msg: 'There is no such video!' });
      res.render('dashboard', {
        errors
      });
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
  const { title, choreographer, thumbnail, url, length, language, level, genre, purpose, mood } = req.body;
  let errors = [];

  // Check required fields
  if (title == '' || choreographer == '' || thumbnail == '' || url == '' || length == '' ||  language == '' || level == '' || genre == '' || purpose == '' || mood == '') {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('upload', { errors, title, choreographer, thumbnail, url, length, language, level, genre, purpose, mood });
  } else {
    Video.findOne({ url: url })
      .then(video => {
        if (video) {

          errors.push({ msg: 'The video is already registered!' });
          res.render('upload', {
            errors
          });
        } else {
          const newVideo = new Video({ title, choreographer, thumbnail, url, length, language, level, genre, purpose, mood });

          newVideo.save()
            .then(function (video) {
              req.flash('success_msg', 'The dance is now registered');
              res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
        }
      })
  }
})

module.exports = router;