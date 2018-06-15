const fetch = require('isomorphic-fetch');
const { parseJsonP } = require('../../shared/utils');
const { client, getAsync } = require('./redis');
const he = require('he');
const HttpsProxyAgent = require('https-proxy-agent');

const ONE_DAY = 60 * 60 * 24;

const URLS = {
  newSongsmainland: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom650982096327902&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A1%7D%7D%7D',
  newSongshktw: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom43677013802051934&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A2%7D%7D%7D',
  newSongseuna: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom5144684456582007&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A3%7D%7D%7D',
  topSongsmainland: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017_51&topid=5&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
  topSongshktw: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017_51&topid=6&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
  topSongseuna: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017_51&topid=3&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
};

function normalizeNewSongs({ new_song: { data: { song_list } } }) {
  return song_list.map(({
    id: songId, mid, singer: singerList, name: song, album,
  }) => {
    const singer = singerList.map(({ name }) => name).join(' ');
    return {
      imageId: album.id,
      songId,
      singer,
      mid,
      song,
    };
  });
}

function normalizeTopSongs({ songlist }) {
  return songlist.map(({
    data: {
      songid: songId, songmid: mid, singer: singerList, songname: song, albumid: imageId,
    },
  }) => {
    const singer = singerList.map(({ name }) => name).join(' ');
    return {
      imageId,
      songId,
      singer,
      mid,
      song,
    };
  });
}

function normalizeSongInfo({ data }) {
  return {
    songId: data[0].id,
    mid: data[0].mid,
    song: data[0].name,
    imageId: data[0].album.id,
    singer: data[0].singer.map(({ name }) => name).join(' '),
  };
}

module.exports = {
  search(q, page = 1) {
    const url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&searchid=37602803789127241&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=20&w=${q}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`;
    return fetch(url)
      .then(r => r.json())
      .then(({ data: { song: songList } }) => ({
        songs: songList.list.map(({
          singer: singerList, name: song, mid, album, id: songId,
        }) => {
          const singer = singerList.map(({ name }) => name).join(' ');
          const imageId = album.id;
          return {
            singer, song, songId, imageId, mid,
          };
        }),
      }))
      .catch(() => ({
        songs: [],
      }));
  },

  getSongInfo(mid) {
    return getAsync(`song:${mid}`).then((cache) => {
      if (cache !== null) {
        return normalizeSongInfo(JSON.parse(cache));
      }
      const url = `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${mid}&tpl=yqq_song_detail&format=json&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`;
      return fetch(url)
        .then(res => res.json())
        .then((res) => {
          client.set(`song:${mid}`, JSON.stringify(res), 'EX', ONE_DAY);
          return normalizeSongInfo(res);
        });
    });
  },

  getSongAddress(mid) {
    return getAsync(`song.address:${mid}`).then((cache) => {
      if (cache !== null) {
        return cache;
      }
      const t = (new Date).getUTCMilliseconds(); // eslint-disable-line
      const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
      const fileName = `C400${mid}.m4a`;
      const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?uin=0&g_tk=1278911659&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&jsonpCallback=MusicJsonCallback&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=${mid}4&filename=${fileName}&guid=${guid}`;
      return fetch(url, {
        agent: new HttpsProxyAgent('http://58.221.72.189:3128'),
        headers: {
          Referer: 'https://y.qq.com/portal/player.html',
          Host: 'y.qq.com',
          Origin: 'https://y.qq.com',
        },
      })
        .then(res => res.json())
        .then(res => res.data.items[0].vkey)
        .then((vkey) => {
          const address = `https://dl.stream.qqmusic.qq.com/${fileName}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`;
          client.set(`song.address:${mid}`, address, 'EX', ONE_DAY);
          return address;
        });
    });
  },

  getLyric(songId) {
    return getAsync(`song.lyric:${songId}`).then((cache) => {
      if (cache !== null) {
        return {
          lyric: he.decode(parseJsonP('jsonp', cache).lyric, {
            decimal: true,
          }),
        };
      }
      const url = `http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=${songId}&callback=jsonp&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`;
      return fetch(url, {
        headers: {
          Referer: 'https://y.qq.com/',
        },
      })
        .then(r => r.text())
        .then((text) => {
          client.set(`song.lyric:${songId}`, text, 'EX', ONE_DAY * 30);
          return {
            lyric: he.decode(parseJsonP('jsonp', text).lyric, {
              decimal: true,
            }),
          };
        })
        .catch(() => ({ lyric: '[offset:0]\n[00:00.00][10:00.00]暂无歌词' }));
    });
  },

  getNewSongs(type) {
    return getAsync(`newSongs:${type}`).then((res) => {
      if (res !== null) {
        return normalizeNewSongs(parseJsonP('JsonCallback', res));
      }
      let url;
      if (type === 'mainland') {
        url = URLS.newSongsmainland;
      } else if (type === 'hktw') {
        url = URLS.newSongshktw;
      } else {
        url = URLS.newSongseuna;
      }
      return fetch(url)
        .then(r => r.text())
        .then((text) => {
          client.set(`newSongs:${type}`, text, 'EX', ONE_DAY);
          return parseJsonP('JsonCallback', text);
        })
        .then(normalizeNewSongs);
    });
  },

  getTopSongs(type) {
    return getAsync(`topSongs:${type}`).then((res) => {
      if (res !== null) {
        return normalizeTopSongs(parseJsonP('JsonCallback', res));
      }
      let url;
      if (type === 'mainland') {
        url = URLS.topSongsmainland;
      } else if (type === 'hktw') {
        url = URLS.topSongshktw;
      } else {
        url = URLS.topSongseuna;
      }
      return fetch(url)
        .then(r => r.text())
        .then((text) => {
          client.set(`topSongs:${type}`, text, 'EX', ONE_DAY);
          return parseJsonP('JsonCallback', text);
        })
        .then(normalizeTopSongs);
    });
  },
};
