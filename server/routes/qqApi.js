const express = require('express');
const { search } = require('../services/qqmusic');

const router = express.Router();

router.get('/', (req, res) => {
  const { q, p } = req.query;

  search(encodeURIComponent(q), p).then((songs) => {
    res.json(songs);
  });
});

module.exports = router;
