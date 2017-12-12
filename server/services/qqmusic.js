const fetch = require('isomorphic-fetch');
const { parseString } = require('xml2js');
const { promisify } = require('util');

module.exports = {
  search(q, page = 1) {
    const url = `http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=10&n=20&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=${page}&catZhida=0&remoteplace=sizer.newclient.next_song&w=${q}`;
    return fetch(url)
      .then(r => r.json())
      .then(({ data: { song: songList } }) => ({
        songs: songList.list.map(({ fsinger: singer, fsong: song, f }) => {
          const id = f.split('|')[0];
          const imageId = f.split('|')[4];
          return {
            singer, song, id, imageId,
          };
        }),
      }))
      .catch(() => ({
        songs: [],
      }));
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
