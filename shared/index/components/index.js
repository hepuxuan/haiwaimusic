import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import BottomNav from '../../components/BottomNav';
import SearchResultList from './SearchResultList';
import HistoryList from './HistoryList';
import Loader from '../../components/Loader';
import { getSearchHistory, updateHistory } from '../../utils';
import '../scss/index.scss';

export default class Index extends React.Component {
  state = {
    searchHistory: getSearchHistory(),
    searchResults: [],
    page: 1,
    q: '',
    isLoading: false,
    isSearching: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getSearchResult(q, page = 1) {
    if (q) {
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

    return Promise.resolve();
  }

  handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight
      && !this.state.isLoading) {
      const { q, page } = this.state;
      const newPage = page + 1;
      this.getSearchResult(q, newPage).then(({ songs }) => {
        this.setState(prevState => ({
          searchResults: prevState.searchResults.concat(songs),
          page: newPage,
        }));
      });
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
    this.getSearchResult(q).then(({ songs }) => {
      this.setState(() => ({
        searchResults: songs,
      }));
    });
  }

  handleFocus = () => {
    this.setState({
      isSearching: true,
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
      searchResults, isLoading, searchHistory, isSearching, q,
    } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <Search
          onChange={this.handleChangeSearchString}
          onFocus={this.handleFocus}
          onSearch={this.handleSearch}
          q={q}
        />
        {
          isSearching ? (
            <HistoryList
              onSelect={this.handleSelectHistory}
              searchHistory={searchHistory}
            />
          ) : <SearchResultList searchResults={searchResults} />
        }
        {
          isLoading && <Loader />
        }
        <BottomNav activeLink="home" />
      </React.Fragment>
    );
  }
}
