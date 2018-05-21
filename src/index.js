import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles';
import App from './app';

const render = () => {
  styles();

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

render();
