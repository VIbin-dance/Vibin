const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => res.render('about'));
router.get("/privacy-policy", (req, res) => res.render("privacy-policy"));
router.get("/terms-of-service", (req, res) => res.render("terms-of-service"));

module.exports = router;