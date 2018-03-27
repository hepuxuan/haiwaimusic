import React from 'react';
import { inject, observer } from 'mobx-react';
import styles from '../scss/search.scss';

@inject('store')
@observer
export default class Search extends React.Component {
  handleChange = (e) => {
    this.props.store.setQ(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch();
  };

  render() {
    const { onSearch, store, ...props } = this.props;
    return (
      <div className={styles.searchRoot}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <div className={styles.searchWrapper}>
            <input
              className={styles.searchInput}
              {...props}
              placeholder="搜索歌手或者歌名"
              onChange={this.handleChange}
              value={store.q}
            />
            <button type="submit">
              <i className="material-icons">search</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
