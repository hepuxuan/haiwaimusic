import React from 'react';
import Navbar from '../../components/Navbar';
import Search from './Search';
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
    this.setState({
      isLoading: true,
    });
    const url = `/api/qqmusic?q=${q}&p=${page}`;
    return fetch(url).then((res) => {
      this.setState({
        isLoading: false,
      });
      return res.json();
    });
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
      <div>
        <Navbar />
        <Search onSearch={this.handleSearch} />
        <SearchResultList searchResults={searchResults} />
        {
          isLoading && <Loader />
        }
      </div>
    );
  }
}
