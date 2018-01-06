import createBrowserHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-110861887-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const history = createBrowserHistory({
  basename: '',
  forceRefresh: false,
});

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

window.browserHistory = history;

export default history;
