const express = require('express');
const { search } = require('../services/qqmusic');
const { getLyric } = require('../services/qqmusic');

const router = express.Router();

router.get('/', (req, res) => {
  const { q, p } = req.query;

  search(encodeURIComponent(q), p).then((songs) => {
    res.json(songs);
  });
});

router.get('/lyric', (req, res) => {
  const { songId } = req.query;

  getLyric(songId).then((lyric) => {
    res.json(lyric);
  });
});

module.exports = router;
