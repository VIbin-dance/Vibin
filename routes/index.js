const express = require('express');
const router = express.Router();
const async = require('async');

const Video = require('../models/Video');

router.get('/', (req, res) => res.render('landing'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/upload', (req, res) => res.render('upload'));

router.post('/dashboard', (req, res) => {
    const { language, level } = req.body;
})

router.post('/upload', (req, res) => {
    const { title, choreographer, url, language, level } = req.body;
    let errors = [];

    // Check required fields
    if (title == '' || choreographer == '' || url == '' || language == '' || level == '') {
      errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
      res.render('upload', {errors, title, choreographer, url, language, level});
        } else {
      Video.findOne({ url: url })
        .then(video => {
          if (video) {

            errors.push({ msg: 'The video is already registered!' });
            res.render('upload', {
              errors
            });
          } else {
            const newVideo = new Video({title, choreographer, url, language, level});

            newVideo.save()
              .then(function(video) {
                req.flash('success_msg', 'The dance is now registered');
                res.redirect('/dashboard');
              })
              .catch(err => console.log(err));
          }
        })
    }
  })

module.exports = router;