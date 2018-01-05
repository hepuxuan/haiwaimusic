import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({
  basename: '',
  forceRefresh: false,
});

window.browserHistory = history;

export default history;
