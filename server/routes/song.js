const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Music = require('../../shared/song/components').default;

const router = express.Router();

router.get('/:song', (req, res) => {
  const { song } = req.params;
  const { singer, songId, imageId } = req.query;
  res.render('template', {
    title: '音乐播放',
    page: 'song',
    body: renderToString(<Music
      songId={songId}
      song={song}
      singer={singer}
      imageId={imageId}
    />),
    data: JSON.stringify({
      songId, singer, song, imageId,
    }),
  });
});

module.exports = router;
