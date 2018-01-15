import React from 'react';
import { inject, observer } from 'mobx-react';
import { Menu, MenuItem } from './Menu';
import styles from './myAccount.scss';

function handleLogout() {
  window.location.assign('/auth/logout');
}

@inject('store') @observer
class Account extends React.Component {
  state = {
    isMenuOpen: false,
  }

  handleClick = () => {
    this.setState({
      isMenuOpen: true,
    });
  }


  render() {
    const { user } = this.props.store;
    const menuTitle = <img className={styles.userImage} src={user.imageUrl} alt={user.name} />;
    return (
      <React.Fragment>
        <Menu title={menuTitle}>
          <MenuItem onClick={handleLogout}>退出登陆</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

function MyAccount({ store }) {
  return (
    <div className={styles.myAccount}>
      {
        store.user ? <Account />
          : <a href="/auth/google">登陆</a>
      }
    </div>
  );
}
export default inject('store')(observer(MyAccount));
