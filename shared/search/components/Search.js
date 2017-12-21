import React from 'react';
import styles from '../scss/search.scss';

export default class Search extends React.Component {
  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch();
  }

  render() {
    const {
      onSearch, onChange, q, ...props
    } = this.props;
    return (
      <div className={styles.search}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <div className={styles.searchWrapper}>
            <input {...props} placeholder="搜索歌手或者歌名" onChange={this.handleChange} value={q} />
            <button type="submit">
              <i className="material-icons">search</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
