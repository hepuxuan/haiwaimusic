const express = require('express');
const React = require('react');
const { useStaticRendering } = require('mobx-react');
const { renderToString, renderToStaticMarkup } = require('react-dom/server');
const ServerApp = require('../ServerApp').default;
const { getPlayList } = require('../services/user');
const Store = require('../../shared/store').default;
const {
  getSongAddress, getSongInfo, getNewSongs, getTopSongs,
} = require('../services/qqmusic');

const router = express.Router();
useStaticRendering(true);

router.get('/', async (req, res) => {
  if (req.query.pwa) {
    const store = new Store({});
    const reactApp = <ServerApp url={req.url} context={{}} store={store} />;

    res.render('template', {
      title: '海外音悦台',
      page: 'index',
      hash: req.hash,
      body: renderToStaticMarkup(reactApp),
      data: JSON.stringify({
        playList: [],
      }),
    });

    return;
  }

  let playList;
  if (req.user) {
    playList = (await getPlayList(req.user.uuid)).songs;
  } else {
    playList = [];
  }

  const type = 'mainland';

  Promise.all([getNewSongs(type), getTopSongs(type)]).then(([newSongs, topSongs]) => {
    const store = new Store({
      user: req.user,
      playList,
      newSongs: { mainland: newSongs },
      topSongs: { mainland: topSongs },
    });

    const reactApp = <ServerApp url={req.url} context={{}} store={store} />;

    res.render('template', {
      title: '海外音悦台',
      page: 'index',
      hash: req.hash,
      body: renderToString(reactApp),
      data: JSON.stringify({
        user: req.user,
        playList,
        newSongs: { mainland: newSongs },
        topSongs: { mainland: topSongs },
      }),
    });
  });
});

router.get('/playList', async (req, res) => {
  let playList;
  if (req.user) {
    playList = (await getPlayList(req.user.uuid)).songs;
  } else {
    playList = [];
  }

  const store = new Store({ user: req.user, playList });

  const reactApp = <ServerApp url={req.url} context={{}} store={store} />;

  res.render('template', {
    title: '我的播放列表',
    hash: req.hash,
    page: 'playList',
    body: renderToString(reactApp),
    data: JSON.stringify({ playList, user: req.user }),
  });
});

router.get('/search', async (req, res) => {
  let playList;
  if (req.user) {
    playList = (await getPlayList(req.user.uuid)).songs;
  } else {
    playList = [];
  }

  const store = new Store({ user: req.user, playList });

  const reactApp = <ServerApp url={req.url} context={{}} store={store} />;

  res.render('template', {
    title: '海外音悦台',
    page: 'search',
    hash: req.hash,
    body: renderToString(reactApp),
    data: JSON.stringify({ playList, user: req.user }),
  });
});

router.get('/song/:song', async (req, res) => {
  const { song } = req.params;
  const { mid } = req.query;
  let playListPromise;
  if (req.user) {
    playListPromise = getPlayList(req.user.uuid);
  } else {
    playListPromise = Promise.resolve({ songs: [] });
  }

  Promise.all([getSongInfo(mid), getSongAddress(mid), playListPromise]).then(([{ songId, singer, imageId }, songUrl, { songs }]) => {
    const store = new Store({
      user: req.user,
      playList: songs,
      song: {
        songId,
        song,
        singer,
        imageId,
        songUrl,
        mid,
      },
    });

    const reactApp = <ServerApp url={req.url} context={{}} store={store} />;

    res.render('template', {
      title: '音乐播放',
      page: 'song',
      hash: req.hash,
      body: renderToString(reactApp),
      data: JSON.stringify({
        song: {
          songId,
          singer,
          song,
          imageId,
          songUrl,
          mid,
        },
        user: req.user,
        playList: songs,
      }),
    });
  });
});

module.exports = router;
