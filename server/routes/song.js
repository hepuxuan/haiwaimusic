const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Music = require('../../shared/song/components').default;
const { getSongAddress, getSongInfo } = require('../services/qqmusic');
const { getPlayList } = require('../services/user');

const router = express.Router();

router.get('/:song', async (req, res) => {
  const { song } = req.params;
  const { mid } = req.query;
  let playListPromise;
  if (req.user) {
    playListPromise = getPlayList(req.user.uuid);
  } else {
    playListPromise = Promise.resolve({ songs: [] });
  }
  Promise.all([getSongInfo(mid), getSongAddress(mid), playListPromise])
    .then(([{ songId, singer, imageId }, songUrl, { songs }]) => {
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
          user={req.user}
          playList={songs}
        />),
        data: JSON.stringify({
          songId, singer, song, imageId, songUrl, mid, user: req.user, playList: songs,
        }),
      });
    });
});

module.exports = router;
