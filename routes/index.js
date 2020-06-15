const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('landing'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/upload', (req, res) => res.render('upload'));

module.exports = router;