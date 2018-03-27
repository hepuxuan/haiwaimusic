import React from 'react';
import { inject, observer } from 'mobx-react';
import { runInAction } from 'mobx';
import Search from './components/Search';
import SearchResultList from './components/SearchResultList';
import HistoryList from './components/HistoryList';
import Hotkeyword from './components/Hotkeyword';
import Loader from '../components/Loader';
import AudioPlayback from '../components/AudioPlayback';
import { getSearchHistory, updateHistory, jsonp } from '../utils';
import styles from './scss/index.scss';

@inject('store')
@observer
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchHistory: [],
      isSearching: false,
      hotwordsList: [],
    };
    runInAction('navigation', () => {
      props.store.isIndex = false;
      props.store.title = '搜索歌曲';
      props.store.showNav = true;
      props.store.path = '/search';
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      searchHistory: getSearchHistory(),
    });
    jsonp(
      'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&jsonpCallback=JsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
      (data) => {
        this.setState({
          hotwordsList: data.data.hotkey.map(({ k }) => k),
        });
      },
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { store } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !store.isLoadingSearchResult
    ) {
      store.fetchMoreSearchResult();
    }
  };

  handleSearch = () => {
    let searchHistory;
    const { q, fetchSearchResult } = this.props.store;
    if (this.state.searchHistory.indexOf(q) === -1) {
      searchHistory = [q, ...this.state.searchHistory].slice(0, 5);
    } else {
      searchHistory = this.state.searchHistory;
    }

    this.setState({
      isSearching: false,
      searchHistory,
    });

    updateHistory(searchHistory);
    if (q) {
      fetchSearchResult();
    }
  };

  handleFocus = () => {
    this.setState({
      isSearching: true,
    });
  };

  handleCloseHistory = () => {
    this.setState({
      isSearching: false,
    });
  };

  handleBlur = () => {
    setTimeout(() => {
      this.setState({
        isSearching: false,
      });
    }, 500);
  };

  handleSelectSearch = (q) => {
    this.props.store.setQ(q);
    this.handleSearch();
  };

  render() {
    const {
      searchHistory, isSearching, hotwordsList,
    } = this.state;
    const { store } = this.props;
    return (
      <div>
        <Search onFocus={this.handleFocus} onSearch={this.handleSearch} />
        {(() => {
          if (isSearching) {
            return (
              <HistoryList
                onSelect={this.handleSelectSearch}
                searchHistory={searchHistory}
                onClose={this.handleCloseHistory}
              />
            );
          } else if (store.q) {
            return <SearchResultList />;
          }
          return (
            <div className={`${styles.hotSearchWords} main-body`}>
              <h4>热门搜索词</h4>
              {hotwordsList.map(k => (
                <Hotkeyword key={k} onClick={this.handleSelectSearch}>
                  {k}
                </Hotkeyword>
              ))}
            </div>
          );
        })()}
        {store.isLoadingSearchResult && <Loader />}
        <AudioPlayback />
      </div>
    );
  }
}
