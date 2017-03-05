import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import ThumbGrid from './ThumbGrid';
import Viewer from './Viewer';
import NotFound from './NotFound';

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={ThumbGrid}>
      <Route path="p/:photoId" component={Viewer} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

export default App;
