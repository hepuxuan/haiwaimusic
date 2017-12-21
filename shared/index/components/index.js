import React from 'react';
import Navbar from './Navbar';
import BottomNav from '../../components/BottomNav';
import HotSongList from './HotSongList';
import { jsonp, getPlayList } from '../../utils';
import styles from '../scss/index.scss';

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

export default class Index extends React.Component {
  state = {
    hotSongsmainland: [],
    hotSongshktw: [],
    hotSongseuna: [],
    playList: [],
    selectedTab: 'mainland',
  }

  componentDidMount() {
    this.setState({
      playList: getPlayList(),
    });
    jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom650982096327902&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A1%7D%7D%7D', (data) => {
      this.setState({
        hotSongsmainland: data.new_song.data.song_list.map(convertToModel),
      });
      jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom43677013802051934&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A2%7D%7D%7D', (data1) => {
        this.setState({
          hotSongshktw: data1.new_song.data.song_list.map(convertToModel),
        });
        jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg?callback=JsonCallback&g_tk=5381&jsonpCallback=recom5144684456582007&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A3%7D%7D%7D', (data2) => {
          this.setState({
            hotSongseuna: data2.new_song.data.song_list.map(convertToModel),
          });
        });
      });
    });
  }

  handleSelectTab = (e) => {
    this.setState({
      selectedTab: e.target.getAttribute('data-value'),
    });
  }

  render() {
    const { playList } = this.state;
    const tabs = (
      <div className={styles.tabs}>
        <div>
          <button
            data-value="mainland"
            className={this.state.selectedTab === 'mainland' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >内地
          </button>
        </div>
        <div>
          <button
            data-value="hktw"
            className={this.state.selectedTab === 'hktw' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >港台
          </button>
        </div>
        <div>
          <button
            data-value="euna"
            className={this.state.selectedTab === 'euna' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >欧美
          </button>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        <div className="page-body">
          <Navbar />
          <React.Fragment>
            <HotSongList songs={playList} title="播放列表" />
            <HotSongList
              songs={this.state[`hotSongs${this.state.selectedTab}`]}
              title="新歌榜单"
              tabs={tabs}
            />
          </React.Fragment>
        </div>
        <BottomNav activeLink="home" />
      </React.Fragment>
    );
  }
}
