const fetch = require('isomorphic-fetch');
const { parseString } = require('xml2js');
const { promisify } = require('util');

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

  getSongAddress(mid) {
    const t = (new Date).getUTCMilliseconds(); // eslint-disable-line
    const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
    const fileName = `C200${mid}.m4a`;
    const url = `http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=${guid}&g_tk=938407465&loginUin=0&hostUin=0&format=json&inCharset=GB2312&outCharset=GB231&platform=yqq&jsonpCallback=&needNewCode=0`;
    return fetch(url)
      .then(res => res.json())
      .then(({ key }) => key)
      .then(vkey => `http://dl.stream.qqmusic.qq.com/${fileName}?vkey=${vkey}&guid=${guid}&fromtag=52`);
  },

  getLyric(songId) {
    const url = `http://music.qq.com/miniportal/static/lyric/${songId % 100}/${songId}.xml`;
    const parseXml = promisify(parseString);
    return fetch(url)
      .then(r => r.text())
      .then(xml => parseXml(xml))
      .then(result => result)
      .catch(() => ({ lyric: '[offset:0]\n[00:00.00][10:00.00]暂无歌词' }));
  },
};
