import React from 'react';
import find from 'lodash/find';
import Navbar from './Navbar';
import Search from './Search';
import BottomNav from '../../components/BottomNav';
import SearchResultList from './SearchResultList';
import HotSongList from './HotSongList';
import HistoryList from './HistoryList';
import Loader from '../../components/Loader';
import { getSearchHistory, updateHistory, jsonp, getPlayList, updatePlayList } from '../../utils';
import '../scss/index.scss';

function convertToModel({
  data: {
    songid, songmid, singer: singerList, songname, albumid,
  },
}) {
  const singer = singerList.map(({ name }) => name).join(' ');
  return {
    imageId: albumid,
    songId: songid,
    singer,
    mid: songmid,
    song: songname,
  };
}

export default class Index extends React.Component {
  state = {
    searchHistory: getSearchHistory(),
    searchResults: [],
    page: 1,
    q: '',
    isLoading: false,
    isSearching: false,
    hotSongs: [],
    playList: [],
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      playList: getPlayList(),
    });
    jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017-09-12&topid=4&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0', (data) => {
      this.setState({
        hotSongs: data.songlist.map(convertToModel),
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getSearchResult(q, page = 1) {
    this.setState({
      isLoading: true,
    });
    const url = `/api/qqmusic?q=${q}&p=${page}`;
    return fetch(url).then(res => res.json()).then((json) => {
      this.setState({
        isLoading: false,
      });
      return json;
    });
  }

  handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight
      && !this.state.isLoading) {
      const { q, page } = this.state;
      const newPage = page + 1;
      if (q) {
        this.getSearchResult(q, newPage).then(({ songs }) => {
          this.setState(prevState => ({
            searchResults: prevState.searchResults.concat(songs),
            page: newPage,
          }));
        });
      }
    }
  }

  handleSearch = () => {
    const { q } = this.state;
    let searchHistory;
    if (this.state.searchHistory.indexOf(q) === -1) {
      searchHistory = [
        q,
        ...this.state.searchHistory,
      ].slice(0, 5);
    } else {
      searchHistory = this.state.searchHistory;
    }

    this.setState({
      isSearching: false,
      searchHistory,
      q,
      searchResults: [],
    });
    updateHistory(searchHistory);
    if (q) {
      this.getSearchResult(q).then(({ songs }) => {
        this.setState(() => ({
          searchResults: songs,
        }));
      });
    }
  }

  handleFocus = () => {
    this.setState({
      isSearching: true,
    });
  }

  handleCloseHistory = () => {
    this.setState({
      isSearching: false,
    });
  }

  handleBlur = () => {
    setTimeout(() => {
      this.setState({
        isSearching: false,
      });
    }, 500);
  }

  handleSelectHistory = (history) => {
    this.setState({
      q: history,
    }, this.handleSearch);
  }

  handleChangeSearchString = (q) => {
    this.setState({
      q,
    });
  }

  handleAddToList = (song) => {
    if (find(this.state.playList, ({ songId }) => songId === song.songId)) {
      return;
    }
    const newList = this.state.playList.concat(song);
    updatePlayList(newList);
    this.setState({
      playList: newList,
    });
  }

  render() {
    const {
      searchResults, isLoading, searchHistory, isSearching, q, hotSongs, playList,
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-body">
          <Navbar />
          <Search
            onChange={this.handleChangeSearchString}
            onFocus={this.handleFocus}
            onSearch={this.handleSearch}
            q={q}
          />
          {
            (!q && !isSearching) && (
              <React.Fragment>
                <HotSongList songs={playList} title="播放列表" />
                <HotSongList songs={hotSongs} title="热门歌曲" />
              </React.Fragment>
            )
          }
          {
            isSearching ? (
              <HistoryList
                onSelect={this.handleSelectHistory}
                searchHistory={searchHistory}
                onClose={this.handleCloseHistory}
              />
            ) : !!q && (
              <SearchResultList
                playList={playList}
                handleAddToList={this.handleAddToList}
                searchResults={searchResults}
              />
            )
          }
          {
            isLoading && <Loader />
          }
        </div>
        <BottomNav activeLink="home" />
      </React.Fragment>
    );
  }
}
