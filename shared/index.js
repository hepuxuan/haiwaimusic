import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Audio from './components/Audio';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Index from './main';
import PlayList from './playList';
import Search from './search';
import Song from './song';
import styles from './index.scss';

export default function (props) {
  return (
    <div className="page-body with-play-back">
      <Navbar />
      <BottomNav activeLink="search" />
      <div className={styles.routeBase}>
        <Route
          render={({ location: _location }) => (
            <TransitionGroup>
              <CSSTransition
                key={_location.pathname}
                timeout={{
                  enter: 500,
                  exit: 300,
                }}
                classNames="fade"
              >
                <Switch location={_location}>
                  <Route path="/song/:song" render={({ match, location }) => <Song location={location} match={match} {...props} />} />
                  <Route path="/playList" render={({ match, location }) => <PlayList location={location} match={match} {...props} />} />
                  <Route path="/search" render={({ match, location }) => <Search location={location} match={match} {...props} />} />
                  <Route exact path="/" render={({ match, location }) => <Index location={location} match={match} {...props} />} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
        )}
        />
      </div>
      <Audio />
    </div>
  );
}
