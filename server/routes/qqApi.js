const express = require('express');
const { search } = require('../services/qqmusic');
const { getLyric, getSongInfo, getSongAddress } = require('../services/qqmusic');

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
  }).catch((e) => { console.log(e); });
});

router.get('/song/:mid', (req, res) => {
  const { mid } = req.params;
  Promise.all([getSongInfo(mid), getSongAddress(mid)])
    .then(([song, songUrl]) => {
      res.json(Object.assign(song, { songUrl })).catch((e) => { console.log(e); });
    });
});

module.exports = router;
