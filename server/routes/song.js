const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Music = require('../../shared/song/components').default;


const router = express.Router();

router.get('/:songId', (req, res) => {
  const { songId } = req.params;
  const { singer, song, imageId } = req.query;

  res.render('template', {
    title: '音乐播放',
    page: 'music',
    body: renderToString(<Music songId={songId} song={song} singer={singer} imageId={imageId} />),
    data: JSON.stringify({
      songId, singer, song, imageId,
    }),
  });
});

module.exports = router;
