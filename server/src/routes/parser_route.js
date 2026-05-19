const express = require('express');

const {
  parseTikTok,
} = require('../controllers/parser_controller');

const router = express.Router();

router.post(
  '/tiktok',
  parseTikTok,
);

module.exports = router;