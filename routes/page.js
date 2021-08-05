const express = require('express');
const router = express.Router();

router.get('/howto-obs', (req, res) => res.render('articles/obs'));

module.exports = router;
