import React from 'react';
import ClickOutside from 'react-click-outside';
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

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
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
      <ClickOutside onClickOutside={this.handleClose}>
        <div className={styles.root}>
          <button onClick={this.handleToggleMenu}>
            {
              this.props.title ? this.props.title : <i className="material-icons">more_vert</i>
            }
          </button>
          {
            this.state.isOpen && (
              <div className={styles.menu}>
                {this.props.children}
              </div>
            )
          }
        </div>
      </ClickOutside >

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
