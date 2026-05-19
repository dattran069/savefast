const express = require('express');

const {
  parseTikTok,
} = require('../controllers/parser_controller');

const router = express.Router();

router.post(
  '/tiktok',
  parseTikTok,
);
router.post(
  '/instagram',
  parseInstagram,
);
module.exports = router;