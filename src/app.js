// @flow

import React from 'react';
import { hot } from 'react-hot-loader';
import Autocomplete from './Autocomplete';

class App extends React.Component<*> {
  static displayName = 'App';

  render() {
    return (
      <Autocomplete
        data={[
          'Brazil',
          'China',
          'Colombia',
          'England',
          'Germany',
          'Italy',
          'Korea',
          'Netherlands',
          'Netherlands',
          'Spain',
          'Switzerland',
          'United States',
        ]}
      />
    );
  }
}

export default hot(module)(App);
