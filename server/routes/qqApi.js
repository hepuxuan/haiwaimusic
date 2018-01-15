const express = require('express');
const { search } = require('../services/qqmusic');
const {
  getLyric, getSongInfo, getSongAddress, getNewSongs, getTopSongs,
} = require('../services/qqmusic');

const router = express.Router();

const ONE_DAY = 60 * 60 * 24;

const ONE_HOUR = 60 * 60;

router.get('/', (req, res) => {
  const { q, p } = req.query;

  search(encodeURIComponent(q), p).then((songs) => {
    res.json(songs);
  });
});

router.get('/lyric', (req, res) => {
  const { songId } = req.query;

  getLyric(songId).then((lyric) => {
    res.setHeader('Cache-Control', `public, max-age=${ONE_DAY}`);
    res.json(lyric);
  });
});

router.get('/newSongs', (req, res) => {
  const { type } = req.query;

  getNewSongs(type).then((songs) => {
    res.setHeader('Cache-Control', `public, max-age=${ONE_DAY}`);
    res.json({
      songs,
    });
  });
});

router.get('/topSongs', (req, res) => {
  const { type } = req.query;

  getTopSongs(type).then((songs) => {
    res.setHeader('Cache-Control', `public, max-age=${ONE_DAY}`);
    res.json({
      songs,
    });
  });
});

router.get('/song/:mid', (req, res) => {
  const { mid } = req.params;
  Promise.all([getSongInfo(mid), getSongAddress(mid)])
    .then(([song, songUrl]) => {
      res.setHeader('Cache-Control', `public, max-age=${ONE_HOUR}`);
      res.json(Object.assign(song, { songUrl })).catch((e) => { console.log(e); });
    });
});

module.exports = router;
