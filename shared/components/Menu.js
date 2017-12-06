import React from 'react';
import { func } from 'prop-types';
import styles from './menu.scss';

export class Menu extends React.Component {
  static childContextTypes = {
    onClose: func,
  }

  state = {
    isOpen: false,
  }

  getChildContext() {
    return {
      onClose: () => {
        setTimeout(() => {
          this.setState({
            isOpen: false,
          });
        }, 500);
      },
    };
  }


  handleToggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  }

  render() {
    return (
      <div className={styles.root}>
        <button onClick={this.handleToggleMenu}>
          <i className="material-icons">more_vert</i>
        </button>
        {
          this.state.isOpen && (
            <div className={styles.menu}>
              {this.props.children}
            </div>
          )
        }
      </div>
    );
  }
}

export function MenuItem({ children, onClick }, { onClose }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        onClick();
      }}
      className={styles.menuItem}
    >{children}
    </button>
  );
}

MenuItem.contextTypes = {
  onClose: func,
};
