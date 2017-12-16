import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import BottomNav from '../../components/BottomNav';
import SearchResultList from './SearchResultList';
import HotSongList from './HotSongList';
import HistoryList from './HistoryList';
import Loader from '../../components/Loader';
import { getSearchHistory, updateHistory, jsonp, getPlayList } from '../../utils';
import '../scss/index.scss';

export default class Index extends React.Component {
  state = {
    searchHistory: getSearchHistory(),
    searchResults: [],
    page: 1,
    q: '',
    isLoading: false,
    isSearching: false,
    hotSongs: [],
    newSongs: [],
    playList: [],
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      playList: getPlayList().map(({
        songId, song, singer, imageId,
      }) => ({
        id: songId, songName: song, singerName: singer, albumId: imageId,
      })),
    });
    jsonp('http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js', (data) => {
      this.setState({
        hotSongs: data.songlist.slice(0, 20),
      });
      jsonp('http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js', (data) => {
        this.setState({
          newSongs: data.songlist.slice(0, 20),
        });
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

  render() {
    const {
      searchResults, isLoading, searchHistory, isSearching, q, hotSongs, newSongs, playList,
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
            ) : !!q && <SearchResultList searchResults={searchResults} />
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
