import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import BottomNav from '../../components/BottomNav';
import SearchResultList from './SearchResultList';
import Loader from '../../components/Loader';
import '../scss/index.scss';

export default class Index extends React.Component {
  state = {
    searchResults: [],
    page: 1,
    q: '',
    isLoading: false,
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

  handleSearch = (q) => {
    this.setState({
      q,
      searchResults: [],
    });
    this.getSearchResult(q).then(({ songs }) => {
      this.setState(() => ({
        searchResults: songs,
      }));
    });
  }

  render() {
    const { searchResults, isLoading } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <Search onSearch={this.handleSearch} />
        <SearchResultList searchResults={searchResults} />
        {
          isLoading && <Loader />
        }
        <BottomNav activeLink="home" />
      </React.Fragment>
    );
  }
}
