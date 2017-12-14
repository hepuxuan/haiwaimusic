import React from 'react';
import styles from '../scss/search.scss';

export default class Search extends React.Component {
  state = {
    q: '',
  }
  handleChange = (e) => {
    this.setState({
      q: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.q);
  }

  render() {
    return (
      <div className={styles.search}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <div className={styles.searchWrapper}>
            <input placeholder="搜索歌手或者歌名" onChange={this.handleChange} value={this.state.q} />
            <button type="submit">
              <i className="material-icons">search</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
