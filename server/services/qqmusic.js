const fetch = require('isomorphic-fetch');
const { parseJsonP } = require('../../shared/utils');
const he = require('he');

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
    const url = `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${mid}&tpl=yqq_song_detail&format=json&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`;
    return fetch(url)
      .then(res => res.json())
      .then(({ data }) => ({
        songId: data[0].id,
        mid: data[0].mid,
        song: data[0].name,
        imageId: data[0].album.id,
        singer: data[0].singer.map(({ name }) => name).join(' '),
      }));
  },

  getSongAddress(mid) {
    const t = (new Date).getUTCMilliseconds(); // eslint-disable-line
    const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
    const fileName = `C200${mid}.m4a`;
    const url = `http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=${guid}&g_tk=938407465&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf8&platform=yqq&jsonpCallback=&needNewCode=0`;
    return fetch(url)
      .then(res => res.json())
      .then(({ key }) => key)
      .then(vkey => `https://dl.stream.qqmusic.qq.com/${fileName}?vkey=${vkey}&guid=${guid}&fromtag=52`);
  },

  getLyric(songId) {
    const url = `http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=${songId}&callback=jsonp&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`;
    return fetch(url, {
      headers: {
        Referer: 'https://y.qq.com/',
      },
    })
      .then(r => r.text())
      .then(text => ({
        lyric: he.decode(parseJsonP('jsonp', text).lyric, {
          decimal: true,
        }),
      }))
      .catch(() => ({ lyric: '[offset:0]\n[00:00.00][10:00.00]暂无歌词' }));
  },
};
