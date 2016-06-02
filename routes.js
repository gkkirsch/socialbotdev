import React from 'react';
import { Route, browserHistory, Router } from 'react-router';
import App from './containers/App';
import ActivityList from './containers/ActivityList';
import Profile from './containers/Profile';
import Insights from './containers/Insights';

export default function Routes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="activities" component={ActivityList}/>
        <Route path="activities/:id" component={Profile}/>
        <Route path="insights" component={Insights}/>
      </Route>
    </Router>
  );
}
