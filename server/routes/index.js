const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Index = require('../../shared/index/components').default;

const router = express.Router();

router.get('/', (req, res) => {
  res.render('template', {
    title: 'qq音乐搜索',
    page: 'index',
    body: renderToString(<Index />),
    data: JSON.stringify({}),
  });
});

module.exports = router;
