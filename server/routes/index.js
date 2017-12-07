const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Index = require('../../shared/index/components').default;

const router = express.Router();

router.get('/', (req, res) => {
  res.render('template', {
    title: '海外音悦台',
    page: 'index',
    hash: req.hash,
    body: renderToString(<Index />),
    data: JSON.stringify({}),
  });
});

module.exports = router;
