import React from 'react';
import Navbar from '../components/Navbar';
import Search from './components/Search';
import BottomNav from '../components/BottomNav';
import SearchResultList from './components/SearchResultList';
import HistoryList from './components/HistoryList';
import Hotkeyword from './components/Hotkeyword';
import Loader from '../components/Loader';
import { getSearchHistory, updateHistory, jsonp } from '../utils';
import styles from './scss/index.scss';

export default class Index extends React.Component {
  state = {
    searchHistory: [],
    searchResults: [],
    page: 1,
    q: '',
    isLoading: false,
    isSearching: false,
    hotwordsList: [],
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      searchHistory: getSearchHistory(),
    });
    jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0', (data) => {
      this.setState({
        hotwordsList: data.data.hotkey.map(({ k }) => k),
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

  handleSelectSearch = (q) => {
    this.setState({
      q,
    }, this.handleSearch);
  }

  handleChangeSearchString = (q) => {
    this.setState({
      q,
    });
  }

  render() {
    const {
      searchResults, isLoading, searchHistory, isSearching, q, hotwordsList,
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-body">
          <Navbar title="搜索歌曲" user={this.props.user} />
          <BottomNav activeLink="search" />
          <Search
            onChange={this.handleChangeSearchString}
            onFocus={this.handleFocus}
            onSearch={this.handleSearch}
            q={q}
          />
          {
            (() => {
              if (isSearching) {
                return (
                  <HistoryList
                    onSelect={this.handleSelectSearch}
                    searchHistory={searchHistory}
                    onClose={this.handleCloseHistory}
                  />
                );
              } else if (q) {
                return (
                  <SearchResultList searchResults={searchResults} />
                );
              }
                return (
                  <div className={`${styles.hotSearchWords} main-body`}>
                    <h4>热门搜索词</h4>
                    {
                      hotwordsList.map(k => (
                        <Hotkeyword key={k} onClick={this.handleSelectSearch}>{k}</Hotkeyword>
                      ))
                    }
                  </div>
                );
            })()
          }
          {
            isLoading && <Loader />
          }
        </div>
      </React.Fragment>
    );
  }
}
