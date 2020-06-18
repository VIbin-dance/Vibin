const express = require('express');
const router = express.Router();
const async = require('async');

const Video = require('../models/Video');
const { response } = require('express');

router.get('/', (req, res) => res.render('landing'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/results', (req, res) => res.render('results'));
router.get('/upload', (req, res) => res.render('upload'));

router.post('/dashboard', async (req, res) => {
  const { language, level, search } = req.body;
  let errors = [];

  const query = {
    $and: [
      { language: language },
      { level: level }
    ]
  }

  const results = await Video.find(query, (err, results) => {
    if (!results.length) {
      errors.push({ msg: 'There is no such video!' });
      res.render('dashboard', {
        errors
      });
    } else {
      res.render('results', {
        results
      })
      console.log(results);
    }
  })
})

router.post('/upload', (req, res) => {
  const { title, choreographer, url, language, level } = req.body;
  let errors = [];

  // Check required fields
  if (title == '' || choreographer == '' || url == '' || language == '' || level == '') {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('upload', { errors, title, choreographer, url, language, level });
  } else {
    Video.findOne({ url: url })
      .then(video => {
        if (video) {

          errors.push({ msg: 'The video is already registered!' });
          res.render('upload', {
            errors
          });
        } else {
          const newVideo = new Video({ title, choreographer, url, language, level });

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