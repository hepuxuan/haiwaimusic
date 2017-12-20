const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Music = require('../../shared/song/components').default;
const { getSongAddress } = require('../services/qqmusic');

const router = express.Router();

router.get('/:song', (req, res) => {
  const { song } = req.params;
  const {
    singer, songId, imageId, mid,
  } = req.query;
  getSongAddress(mid).then((songUrl) => {
    res.render('template', {
      title: '音乐播放',
      page: 'song',
      hash: req.hash,
      body: renderToString(<Music
        songId={songId}
        song={song}
        singer={singer}
        imageId={imageId}
        songUrl={songUrl}
        mid={mid}
      />),
      data: JSON.stringify({
        songId, singer, song, imageId, songUrl, mid,
      }),
    });
  });
});

module.exports = router;
