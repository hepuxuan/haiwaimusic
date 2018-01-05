import React from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from './components/Mainnav';
import BottomNav from '../components/BottomNav';
import HotSongList from './components/HotSongList';
import AudioPlayback from '../components/AudioPlayback';
import { jsonp } from '../utils';
import styles from './scss/index.scss';

function convertToModel({
  id: songId, mid, singer: singerList, name: song, album,
}) {
  const singer = singerList.map(({ name }) => name).join(' ');
  return {
    imageId: album.id,
    songId,
    singer,
    mid,
    song,
  };
}

function convertToModel2({
  data: {
    songid: songId, songmid: mid, singer: singerList, songname: song, albumid: imageId,
  },
}) {
  const singer = singerList.map(({ name }) => name).join(' ');
  return {
    imageId,
    songId,
    singer,
    mid,
    song,
  };
}

const URLS = {
  hotSongsmainland: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom650982096327902&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A1%7D%7D%7D',
  hotSongshktw: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom43677013802051934&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A2%7D%7D%7D',
  hotSongseuna: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom5144684456582007&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A3%7D%7D%7D',
  topSongsmainland: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017_51&topid=5&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
  topSongshktw: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017_51&topid=6&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
  topSongseuna: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017_51&topid=3&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
};

@inject('store') @observer
export default class Index extends React.Component {
  state = {
    hotSongsmainland: [],
    hotSongshktw: [],
    hotSongseuna: [],
    topSongsmainland: [],
    topSongshktw: [],
    topSongseuna: [],
    selectedhotSongsTab: 'mainland',
    selectedtopSongsTab: 'mainland',
  }

  componentDidMount() {
    jsonp(URLS.hotSongsmainland, (data) => {
      this.setState({
        hotSongsmainland: data.new_song.data.song_list.map(convertToModel),
      });
      jsonp(URLS.topSongsmainland, (data2) => {
        this.setState({
          topSongsmainland: data2.songlist.map(convertToModel2),
        });
      });
    });
  }

  handleSelectTab = (e) => {
    const selectedTab = e.target.getAttribute('data-value');
    const type = e.target.getAttribute('data-type');
    this.setState({
      [`selected${type}Tab`]: selectedTab,
    });
    const stateName = `${type}${selectedTab}`;

    if (!this.state[stateName].length) {
      if (type === 'hotSongs') {
        jsonp(URLS[stateName], (data) => {
          this.setState({
            [stateName]: data.new_song.data.song_list.map(convertToModel),
          });
        });
      } else {
        jsonp(URLS[stateName], (data) => {
          this.setState({
            [stateName]: data.songlist.map(convertToModel2),
          });
        });
      }
    }
  }

  renderTabs(type) {
    return (
      <div className={styles.tabs}>
        <div>
          <button
            data-type={type}
            data-value="mainland"
            className={this.state[`selected${type}Tab`] === 'mainland' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >内地
          </button>
        </div>
        <div>
          <button
            data-type={type}
            data-value="hktw"
            className={this.state[`selected${type}Tab`] === 'hktw' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >港台
          </button>
        </div>
        <div>
          <button
            data-type={type}
            data-value="euna"
            className={this.state[`selected${type}Tab`] === 'euna' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >欧美
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { playList } = this.props.store;
    const hotSongsTabs = this.renderTabs('hotSongs');
    const topSongsTabs = this.renderTabs('topSongs');

    return (
      <React.Fragment>
        <div className="page-body">
          <Navbar />
          <BottomNav activeLink="home" />
          <div className={`main-body ${styles.indexMain}`}>
            <HotSongList songs={playList} title="播放列表" />
            <HotSongList
              songs={this.state[`hotSongs${this.state.selectedhotSongsTab}`]}
              title="新歌榜单"
              tabs={hotSongsTabs}
            />
            <HotSongList
              songs={this.state[`topSongs${this.state.selectedtopSongsTab}`]}
              title="巅峰榜单"
              tabs={topSongsTabs}
            />
            <AudioPlayback />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
