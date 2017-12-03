const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Music = require('../../shared/song/components').default;
const { getLyric } = require('../services/qqmusic');

const router = express.Router();

router.get('/:song', (req, res) => {
  const { song } = req.params;
  const { singer, songId, imageId } = req.query;
  getLyric(songId).then(({ lyric }) => {
    res.render('song', {
      title: '音乐播放',
      page: 'music',
      body: renderToString(<Music
        songId={songId}
        song={song}
        singer={singer}
        imageId={imageId}
        lyric={lyric}
      />),
      data: JSON.stringify({
        songId, singer, song, imageId, lyric,
      }),
    });
  });
});

module.exports = router;
