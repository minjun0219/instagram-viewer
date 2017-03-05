import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import App from './components/App';

import './assets/scss/index.scss';

const rootElement = document.getElementById('root');
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
