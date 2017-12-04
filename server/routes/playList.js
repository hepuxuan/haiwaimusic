const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const PlayList = require('../../shared/playList/components').default;

const router = express.Router();

router.get('/', (req, res) => {
  res.render('template', {
    title: '我的播放列表',
    page: 'playList',
    body: renderToString(<PlayList />),
    data: JSON.stringify({}),
  });
});

module.exports = router;
