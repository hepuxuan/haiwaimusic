const express = require('express');
const { addToPlayList, removeFromPlayList } = require('../services/user');

const router = express.Router();

router.post('/playList', (req, res) => {
  if (req.user) {
    addToPlayList(req.user.uuid, req.body).then(() => {
      res.json({});
    }).catch((e) => { console.log(e); });
  } else {
    res.json({});
  }
});

router.delete('/playList/:song', (req, res) => {
  const { user } = req;

  if (user) {
    const { song } = req.params;
    removeFromPlayList(user.uuid, song).then(() => res.json()).catch((e) => { console.log(e); });
  } else {
    res.json({});
  }
});

module.exports = router;
