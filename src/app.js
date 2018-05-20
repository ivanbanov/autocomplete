// @flow

import React from 'react';
import Autocomplete from './Autocomplete';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <Autocomplete />
    );
  }
}

export default hot(module)(App);
