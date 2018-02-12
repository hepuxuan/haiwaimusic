import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Audio from './components/Audio';
import Index from './main';
import Shell from './shell';
import PlayList from './playList';
import Search from './search';
import Song from './song';

export default function (props) {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/song/:song" render={({ match, location }) => <Song location={location} match={match} {...props} />} />
        <Route path="/playList" render={({ match, location }) => <PlayList location={location} match={match} {...props} />} />
        <Route path="/search" render={({ match, location }) => <Search location={location} match={match} {...props} />} />
        <Route exact path="/shell" render={({ match, location }) => <Shell location={location} match={match} {...props} />} />
        <Route exact path="/" render={({ match, location }) => <Index location={location} match={match} {...props} />} />
      </Switch>
      <Audio />
    </React.Fragment>
  );
}
