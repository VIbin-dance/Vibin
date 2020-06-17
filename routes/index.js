const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('landing'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/upload', (req, res) => res.render('upload'));

// router.post('/dashboard', (req,res) => {
//     Video.find({ something: something })
//         .then(video => {
//             if(video) {
//                 res.render('dashboard', {
//                     video
//                 })
//             }
//         });
// })

// router.post('/upload', (req, res) => {
//     const { name, url } = req.dance;
//     let errors = [];

//     // Check required fields
//     if (name == '' || url == '') {
//       errors.push({ msg: 'Please fill in all fields' });
//     }

//     if (errors.length > 0) {
//       res.render('upload', {errors, name, url});
//         } else {
//       Video.findOne({ url: url })
//         .then(video => {
//           if (video) {

//             errors.push({ msg: 'The video is already registered!' });
//             res.render('upload', {
//               errors
//             });
//           } else {
//             const newVideo = new Video({name, url});

//             newVideo.save()
//               .then(function(dance) {
//                 req.flash('success_msg', 'The dance is now registered');
//                 res.redirect('/dashboard');
//               })
//               .catch(err => console.log(err));
//           }
//         })
//     }
//   })

module.exports = router;