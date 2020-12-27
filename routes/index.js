const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const passport = require('passport');
const fetch = require('node-fetch');
const moment = require('moment');
const stripe = require('stripe')('sk_test_51Hfnh4BHyna8CK9qjfFDuXjt1pmBPnPMoGflpvhPIet1ytDmqDZD3sayrbLnHbIQXnLBIZ8UWxSe62EaNZuw2oDO00b2zFDdno');
const {
  ensureAuthenticated
} = require('../config/auth');
const {
  onlyDevs
} = require('../config/dev');

const Video = require('../models/Video');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const {
  response
} = require('express');
const { renderFile } = require('ejs');

router.get('/', (req, res) => {
  // if (req.session.passport) {
  //   req.flash('success_msg', res.__('msg.success.login'));
  //   res.redirect('/dashboard/-1?page=1&limit=15');
  // } else {
  res.render('landing')
  // }
});

router.get('/error', (req, res) => {
  res.send('Login error')
});
router.get('/privacy-policy', (req, res) => res.render('privacy-policy'));
router.get('/terms-of-service', (req, res) => res.render('terms-of-service'));

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
    const user = await User.findOne({
      email: req.user._json.email
    }).exec();
    if (user.loginCount == 1) {
      req.flash('success_msg', res.__('msg.success.preference'))
      res.redirect('/users/preference');
    } else {
      req.flash('success_msg', res.__('msg.success.login'))
      res.redirect('/dashboard/-1?page=1&limit=15');
    }
  }
);

router.get('/dashboard/:sort', ensureAuthenticated, (req, res) => {
  User.findOne({
    email: req.user._json.email
  }, async (err, user) => {
    const limit = 12;

    let query = {
      $and: [{
          level: user.tags.level
        },
        {
          genre: user.tags.genre[0]
        },
        {
          purpose: user.tags.purpose
        }
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

    let countRec = await Video.find(query).exec();

    if (countRec.length < 12) {
      query = {
        $or: [{
            level: query.$and[0].level
          },
          {
            genre: query.$and[1].genre
          },
          {
            purpose: query.$and[2].purpose
          }
        ]
      }

      countRec = await Video.find(query).exec();
    }

    Video.paginate({}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: {
        publishedDate: req.params.sort
      }
    }, async (err, result) => {

      const max = countRec.length - limit;
      const skip = Math.floor(Math.random() * max);

      const options = {
        sort: {
          publishedDate: -1
        },
        limit: limit,
        skip: skip
      };

      Video.find(query, null, options, async (err, resultRec) => {
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

        const lesson = await Lesson.find({}).exec();

        const idLesson = [];
        const titleLesson = [];
        const choreographerLesson = [];
        const levelLesson = [];
        const thumbnailLesson = [];

        for (let i = 0; i < lesson.length; i++) {
          idLesson[i] = lesson[i]._id;
          titleLesson[i] = lesson[i].title;
          choreographerLesson[i] = lesson[i].choreographer;
          levelLesson[i] = lesson[i].level[0];
          thumbnailLesson[i] = lesson[i].thumbnail;
        }

        res.render('dashboard', {
          CLIENT_id: process.env.ZOOM_CLIENT_ID,
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
          lesson: lesson,
          idLesson: idLesson,
          titleLesson: titleLesson,
          choreographerLesson: choreographerLesson,
          levelLesson: levelLesson,
          thumbnailLesson: thumbnailLesson,
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
  const {
    lengthCat,
    language,
    level,
    genre,
    purpose,
    mood,
    search
  } = req.body;

  const searchQuery = new RegExp(escapeRegex(search), 'gi');

  const query = {
    $and: [{
        lengthCat: lengthCat
      },
      {
        language: language
      },
      {
        level: level
      },
      {
        genre: genre
      },
      {
        purpose: purpose
      },
      {
        mood: mood
      }
    ],
    $or: [{
        title: searchQuery
      },
      {
        choreographer: searchQuery
      }
    ]
  }

  Video.paginate(query, {
    page: req.query.page,
    limit: 100
  }, async (err, result) => {
    const user = await User.findOne({
      email: req.user._json.email
    }).exec();
    let title = [];
    let choreographer = [];
    let url = [];
    let level = [];
    let thumbnail = [];
    let id = [];

    if (!result.docs.length) {
      req.flash('error_msg', res.__('msg.error.video'));
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
  Video.find({
    choreographer: req.params.id
  }, async (err, result) => {
    const user = await User.findOne({
      email: req.user._json.email
    }).exec();
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
  User.findOne({
    email: req.user._json.email
  }, (err, user) => {

    let time = encodeURIComponent(moment().format());
    let summary = [];
    let dateTime = [];
    let id = [];
    let idCal = [];

    fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?orderBy=startTime&q=vibin&singleEvents=true&timeMin=${time}&key=${process.env.API_key}`, {
        'headers': {
          'Authorization': `Bearer ${user.accessToken}`
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.items == undefined) {
          req.flash('error_msg', res.__('msg.error.auth'));
          res.redirect('/');
        } else {
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
        }
      })
  })
});

router.get('/follow', ensureAuthenticated, async (req, res) => {
  const currentUser = await User.findOne({
    email: req.user._json.email
  }, 'following userPhoto userPhotoDef tags email').exec();
  const recUser = await User.find({
    "tags.genre": currentUser.tags.genre[0]
  }, null, {
    limit: 3
  }).exec();

  User.find({
    _id: currentUser.following
  }, async (err, user) => {

    let allUser = new Array();
    let time = new Array();

    for (j = 0; j < user.length; j++) {
      allUser[j] = new Array();
      time[j] = new Array();
    }

    for (j = 0; j < user.length; j++) {
      for (i = 0; i < user[j].like.length; i++) {
        allUser[j][i] = await Video.find({
          _id: user[j].like[i].id
        }, null, {
          sort: {
            'like.date': -1
          }
        }).exec();
        time[j][i] = moment(allUser[j][i][0].like[0].date).fromNow();
      }
    }

    res.render('following', {
      currentUser: currentUser,
      recUser: recUser,
      user: user,
      count: user.length,
      allUser: allUser,
      time: time,
      userPhoto: currentUser.userPhoto,
      userPhotoDef: currentUser.userPhotoDef,
    });
  })
});

router.post('/calendar', ensureAuthenticated, (req, res) => {
  User.findOne({
    email: req.user._json.email
  }, (err, user) => {

    const {
      idCal
    } = req.body;

    let result = fetch(`https://www.googleapis.com/calendar/v3/calendars/${user.email}/events/${idCal}?key=${process.env.API_key}`, {
      'method': 'DELETE',
      'headers': {
        'Authorization': `Bearer ${user.accessToken}`,
        'Accept': 'application/json'
      }
    })

    result.then(function (result) {
      if (result.status == 404) {
        req.flash('error', res.__('msg.error.video'));
        res.redirect('/calendar');
      } else if (result.status == 200 || 204) {
        req.flash('success_msg', res.__('msg.success.dance_del'));
        res.redirect('/calendar');
      }
    })
  })
});

router.get('/player/:id', ensureAuthenticated, (req, res) => {
  Video.findOne({
    id: req.params.id
  }, async (err, result) => {
    const user = await User.findOne({
      email: req.user._json.email
    }).exec();
    if (result == null) {
      req.flash('error_msg', res.__('msg.error.video_del'));
      res.redirect('/dashboard/-1?page=1&limit=15');
    } else {
      res.render('player', {
        like: user.like,
        userPhoto: user.userPhoto,
        userPhotoDef: user.userPhotoDef,
        id: req.params.id,
        ObjID: result._id,
        title: result.title,
        choreographer: result.choreographer,
        level: result.level,
      });
    }
  })
});

router.post('/player/:id', ensureAuthenticated, async (req, res) => {
  const {
    id,
    action
  } = req.body;

  const videoID = await Video.findOne({
    id: id
  }, '_id').exec();

  User.findOne({
    email: req.user._json.email
  }, (err, user) => {

    const userID = user._id;

    try {
      if (action == 'like') {
        Video.findByIdAndUpdate(videoID._id, {
          $push: {
            like: [{
              id: userID.toString()
            }]
          }
        }).exec();
        User.findByIdAndUpdate(userID, {
            $push: {
              like: [{
                id: videoID.toObject()._id
              }]
            }
          }).exec()
          .then(function (user) {
            res.redirect(`/player/${id}`)
          })
          .catch(err => console.log(err));
      } else if (action == 'unlike') {
        Video.findByIdAndUpdate(videoID._id, {
          $pull: {
            like: {
              id: user._id.toString()
            }
          }
        }).exec();
        User.findByIdAndUpdate(userID, {
            $pull: {
              like: {
                id: videoID.toObject()._id
              }
            }
          }).exec()
          .then(function (user) {
            res.redirect(`/player/${id}`)
          })
          .catch(err => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  })
});

router.post('/player/:id/calendar', ensureAuthenticated, (req, res) => {
  const {
    id,
    date,
    time
  } = req.body;
  let errors = [];

  Video.findOne({
    id: id
  }, (err, result) => {
    User.findOne({
      email: req.user._json.email
    }, (err, user) => {
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
              "overrides": [{
                "method": "email",
                "minutes": 30
              }]
            }
          })
        })
        .then(response => response.json())
        .then(data => {
          if (date == '') {
            errors.push({
              msg: res.__('msg.error.fill')
            });
          }

          if (errors.length > 0) {
            res.render('player', {
              errors,
              userPhoto: req.session.passport.user.photos[0].value,
              title: result.title,
              choreographer: result.choreographer,
              id: id,
              level: result.level
            });
          } else {
            req.flash('success_msg', res.__('msg.success.schedule'));
            res.redirect('/calendar');
          }
        })
    })
  })
})

router.get('/upload', ensureAuthenticated, onlyDevs, async (req, res) => {
  const user = await User.findOne({
    email: req.user._json.email
  }).exec();
  res.render('upload', {
    userPhoto: user.userPhoto,
    userPhotoDef: user.userPhotoDef,
    API_key: process.env.API_key
  });
})

router.post('/upload', (req, res) => {
  const {
    title,
    choreographer,
    thumbnail,
    url,
    id,
    publishedDate,
    length,
    lengthCat,
    language,
    level,
    genre,
    purpose,
    mood
  } = req.body;
  let errors = [];

  // Check required fields
  if (title == '' || choreographer == '' || thumbnail == '' || url == '' || id == '' || publishedDate == '' || length == '' || lengthCat == '' || language == '' || level == undefined || genre == undefined || purpose == undefined || mood == undefined) {
    errors.push({
      msg: res.__('msg.error.fill')
    });
  }

  if (errors.length > 0) {
    res.render('upload', {
      errors,
      userPhoto: req.session.passport.user.photos[0].value,
      API_key: process.env.API_key,
      CLIENT_id: process.env.CLIENT_id,
      title,
      choreographer,
      thumbnail,
      url,
      id,
      publishedDate,
      length,
      lengthCat,
      language,
      level,
      genre,
      purpose,
      mood
    });
  } else {
    Video.findOne({
        url: url
      })
      .then(video => {
        if (video) {
          errors.push({
            msg: res.__('msg.error.dupl')
          });
          res.render('upload', {
            errors,
            userPhoto: req.session.passport.user.photos[0].value,
            API_key: process.env.API_key
          });
        } else {
          const newVideo = new Video({
            title,
            choreographer,
            thumbnail,
            url,
            id,
            publishedDate,
            length,
            lengthCat,
            language,
            level,
            genre,
            purpose,
            mood
          });
          newVideo.save()
            .then(function (video) {
              req.flash('success_msg', res.__('msg.success.upload'));
              res.redirect('/upload');
            })
            .catch(err => console.log(err));
        }
      })
  }
  Video.updateMany({}, {
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

router.get('/reservation/:id', ensureAuthenticated, async (req, res) => {
  const user = await User.findOne({
    email: req.user._json.email
  }, 'userPhoto userPhotoDef').exec();
  const lesson = await Lesson.findOne({
    _id: req.params.id
  }).exec();
  const choreographer = await User.findOne({
    _id: lesson.choreographerID
  }).exec();
  const account = await stripe.accounts.retrieve(choreographer.stripeID);

  // const intent = await stripe.paymentIntents.create({
  //   payment_method_types: ['card'],
  //   amount: lesson.price,
  //   currency: 'jpy',
  //   application_fee_amount: lesson.price * 0.4,
  //   transfer_data: {
  //     destination: account.id,
  //   },
  // });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: lesson.title,
      images: [lesson.thumbnail],
      amount: lesson.price,
      currency: 'jpy',
      quantity: 1,
    }],
    payment_intent_data: {
      application_fee_amount: lesson.price * 0.4,
      transfer_data: {
        destination: account.id,
      },
    },
    success_url: 'http://localhost:5000/success',
    cancel_url: `http://localhost:5000/reservation/${req.params.id}`,
  });

  console.log(session);

  res.render('reservation', {
    // client_secret: intent.clinet_secret,
    id: session.id,
    lesson: lesson,
    userPhoto: user.userPhoto,
    userPhotoDef: user.userPhotoDef,
  });
})



router.get('/success', ensureAuthenticated, async (req, res) => {
  req.flash('success_msg', res.__('msg.success.login'));

  const user = await User.findOne({
    email: req.user._json.email
  }, 'userPhoto userPhotoDef').exec();

  res.render('success', {
    userPhoto: user.userPhoto,
    userPhotoDef: user.userPhotoDef,
  });
})

// router.get('/cancel', ensureAuthenticated, async (req, res) => {
//   req.flash('success_msg', res.__('msg.success.login'));
//   res.redirect('/reservation/-1?page=1&limit=15');
//   // const user = await User.findOne({ email: req.user._json.email }, 'userPhoto userPhotoDef').exec();

//   // res.render('cancel', {
//   //   userPhoto: user.userPhoto,
//   //   userPhotoDef: user.userPhotoDef,
//   // });
// })

// router.post('/create-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     customer_email: req.user._json.email,
//     submit_type: 'pay',
//     line_items: [
//       {
//         price_data: {
//           currency: 'jpy',
//           product_data: {
//             name: 'Stubborn Attachments',
//             images: ['https://i.imgur.com/EHyR2nP.png'],
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: 'http://localhost:5000/success',
//     cancel_url: 'http://localhost:5000/cancel',
//   });
//   res.json({ id: session.id });
// });

// router.get('/checkout', async (req, res) => {
//   const intent = await stripe.paymentIntents.create({
//     payment_method_types: ['card'],
//     amount: 1000,
//     currency: 'jpy',
//     application_fee_amount: 123,
//     transfer_data: {
//       destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
//     },
//   });

//   res.render('checkout', { client_secret: intent.client_secret });
// });


router.get('/create', ensureAuthenticated, async (req, res) => {
  const user = await User.findOne({ email: req.user._json.email }).exec();

  if (req.query.code) {
    fetch(`https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=https://fathomless-crag-65791.herokuapp.com/create`, {
      'method': 'POST',
      'headers': {
        'Authorization': 'Basic c3RPRXpJVExROXlVd1pWSm1IaHdDUTpNNWpkREU0d1l3VERIandwdnJtQ0kzSGdoOUQ0M0ZvWQ==',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          req.flash('error_msg', data.reason);
          res.redirect('/create');
        } else {
          fetch(`https://api.zoom.us/v2/users`, {
            'headers': {
              'Authorization': `Bearer ${data.access_token}`,
            }
          })
            .then(response => response.json())
            .then(async zoom => {
              console.log(zoom);

              //user update
              User.findOneAndUpdate({ email: req.user._json.email }, {
                zoom: {
                  id: zoom.users[0].id,
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                }
              }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, user) => {
                if (err) {
                  console.log(err);
                }
              })

            //   let render = {
            //     choreographer: user.username,
            //     userPhoto: user.userPhoto,
            //     userPhotoDef: user.userPhotoDef,
            //     CLIENT_id: process.env.ZOOM_CLIENT_ID,
            //     zoom: zoom
            //   }

            //   if (user.stripeID) {
            //     const account = await stripe.accounts.retrieve(user.stripeID);
            //     const loginLink = await stripe.accounts.createLoginLink(user.stripeID);
            //     render.account = account
            //     render.loginLink = loginLink
            //   }

            //  res.render('create', render);
            })
        }
      })
  }

  let render = {
    choreographer: user.username,
    userPhoto: user.userPhoto,
    userPhotoDef: user.userPhotoDef,
    CLIENT_id: process.env.ZOOM_CLIENT_ID,
  }

  if (user.stripeID) {
    const account = await stripe.accounts.retrieve(user.stripeID);
    const loginLink = await stripe.accounts.createLoginLink(user.stripeID);

    render.account = account
    render.loginLink = loginLink
  }

  const fetchUser = () => {
    fetch(`https://api.zoom.us/v2/users`, {
      'headers': {
        'Authorization': `Bearer ${user.zoom.accessToken}`,
      }
    })
    .then(response => response.json())
    .then(zoom => {
      if (zoom.code == 124) {
        fetch(`https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${user.zoom.refreshToken}`, {
          'headers': {
            'Authorization': 'Basic c3RPRXpJVExROXlVd1pWSm1IaHdDUTpNNWpkREU0d1l3VERIandwdnJtQ0kzSGdoOUQ0M0ZvWQ==',
          }
        })
        .then(response => response.json())
        .then(data => {
          User.findOneAndUpdate({ email: req.user._json.email }, {
            zoom: {
              accessToken: data.access_token
            }
          }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, user) => {
            console.log(err || user);
          })
        })
      }
      console.log(render)
      render.zoom = zoom
      })
  }

  if (user.zoom) {
    fetchUser();
  }

  res.render('create', render);
})

router.post('/create', async (req, res) => {
  const user = await User.findOne({ email: req.user._json.email }).exec();
  const account = await stripe.accounts.retrieve(user.stripeID);
  const loginLink = await stripe.accounts.createLoginLink(user.stripeID);
  const choreographerID = user._id;

  const { title, thumbnail, language, choreographer, time, price, level, genre, purpose, mood } = req.body;

  let errors = [];

  if (title == '' || thumbnail == '' || language == '' || choreographer == '' || time == '' || price == '' || level == undefined || genre == undefined || purpose == undefined || mood == undefined) {
    errors.push({ msg: res.__('msg.error.fill')});
  }

  if (!user.zoom.id) {
    errors.push({ msg: 'no zoom'});
    // res.__('msg.error.fill')
  }

  if (errors.length > 0) {
    res.render('create', {
      errors,
      account: account,
      loginLink: loginLink,
      userPhoto: user.userPhoto,
      userPhotoDef: user.userPhotoDef,
      API_key: process.env.API_key,
      CLIENT_id: process.env.ZOOM_CLIENT_ID,
      title,
      thumbnail,
      language,
      choreographer,
      price,
      level,
      genre,
      purpose,
      mood
    });
  } else {
    Lesson.findOne({ title: title })
      .then(lesson => {
        if (lesson) {
          errors.push({ msg: res.__('msg.error.dupl')});
          res.render('create', {
            errors,
            account: account,
            loginLink: loginLink,
            userPhoto: user.userPhoto,
            userPhotoDef: user.userPhotoDef,
            API_key: process.env.API_key,
            CLIENT_id: process.env.ZOOM_CLIENT_ID,
          });
        } else {
          const newLesson = new Lesson({
            title,
            thumbnail,
            language,
            choreographer,
            choreographerID,
            time,
            price,
            level,
            genre,
            purpose,
            mood
          });
          newLesson.save()
            .then(async function (lesson) {
              console.log(lesson);

              // create meeting
              fetch(`https://api.zoom.us/v2/users/${user.zoom.id}/meetings`, {
                  'headers': {
                    'method': 'POST',
                    'Authorization': `Bearer ${user.zoom.accessToken}`,
                  },
                  // moment(data.items[i].start.dateTime).format('MMMM Do YYYY, h:mm a');
                  'body': JSON.stringify({
                    "topic": `${lesson.title}`,
                    "type": 2,
                    "start_time": "string [date-time]",
                    "duration": 40,
                    "timezone": "Asia/Tokyo",
                    // "password": "string",
                    "agenda": `${lesson.level} ${lesson.genre} lesson for ${lesson.purpose}! Let's dance`,
                    "settings": {
                      "contact_email": `${user.email}`,
                      "contact_name": `${lesson.choreographer}`,
                      "use_pmi": true,
                      "auto_recording": "cloud",
                      "registrants_email_notification": true,
                      "meeting_authentication": true,
                    }
                  })
                })
                .then(response => response.json())
                .then(zoom => {
                  res.redirect('/create');
                  // res.render('create', {
                  //   account: account,
                  //   loginLink: loginLink.url,
                  //   choreographer: user.username,
                  //   userPhoto: user.userPhoto,
                  //   userPhotoDef: user.userPhotoDef,
                  //   CLIENT_id: process.env.ZOOM_CLIENT_ID,
                  //   zoom: zoom
                  // });
                })

              if (account == undefined) {
                try {
                  const account = await stripe.accounts.create({
                    type: "express"
                  });
                  const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: 'https://vibin.tokyo/create',
                    return_url: 'http://localhost:5000/create',
                    type: 'account_onboarding',
                  });

                  if (account) {
                    User.findOneAndUpdate({
                      email: req.user._json.email
                    }, {
                      stripeID: account.id
                    }, {
                      upsert: true,
                      new: true,
                      setDefaultsOnInsert: true
                    }, (err, user) => {
                      if (err) {
                        console.log(err);
                      }
                    })
                  }

                  req.flash('success_msg', res.__('msg.success.create'));
                  res.redirect(accountLink.url);
                } catch (err) {
                  res.status(500).send({
                    error: err.message
                  });
                }
              } else {
                req.flash('success_msg', res.__('msg.success.create'));
                res.redirect('/create');
              }
            })
            .catch(err => console.log(err));
        }
      })
  }
  Lesson.updateMany({}, {
      $addToSet: {
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

// router.get('/zoom', (req, res) => {
//   fetch(`https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=https://fathomless-crag-65791.herokuapp.com/create`, {
//     'method': 'POST',
//     'headers': {
//       'Authorization': 'Basic c3RPRXpJVExROXlVd1pWSm1IaHdDUTpNNWpkREU0d1l3VERIandwdnJtQ0kzSGdoOUQ0M0ZvWQ==',
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       if (data.error) {
//         req.flash('error_msg', data.reason);
//         res.redirect('/create');
//       } else {
//         req.flash('success_msg', res.__('msg.success.login'));
//         res.redirect('/create');
//       }
//     })
// })

// Match the raw body to content type application/json
router.post('/webhook', (req, res) => {
  let event;

  try {
    event = JSON.parse(req.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
      // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({
    received: true
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;