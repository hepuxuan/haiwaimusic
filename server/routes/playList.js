const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const PlayList = require('../../shared/playList/components').default;
const { getPlayList } = require('../services/user');

const router = express.Router();

router.get('/', async (req, res) => {
  let playList;
  if (req.user) {
    playList = (await getPlayList(req.user.uuid)).songs;
  } else {
    playList = [];
  }

  res.render('template', {
    title: '我的播放列表',
    hash: req.hash,
    page: 'playList',
    body: renderToString(<PlayList playList={playList} user={req.user} />),
    data: JSON.stringify({ playList, user: req.user }),
  });
});

module.exports = router;
