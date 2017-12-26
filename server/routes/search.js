const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Index = require('../../shared/search/components').default;
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
    title: '海外音悦台',
    page: 'search',
    hash: req.hash,
    body: renderToString(<Index user={req.user} playList={playList} />),
    data: JSON.stringify({ playList, user: req.user }),
  });
});

module.exports = router;
