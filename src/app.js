// @flow

import React from 'react';
import { hot } from 'react-hot-loader';
import Autocomplete from './Autocomplete';

class App extends React.Component<*> {
  static displayName = 'App';

  render() {
    return (
      <div>
        <h2>Static data <small>(countries)</small></h2>
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
            'Spain',
            'Switzerland',
            'United States',
          ]}
          onSelect={item => alert(item)}
        />

        <br />
        <br />

        <h2>Dynamic data <small>(restaurants)</small></h2>
        <Autocomplete
          data="https://opentable.herokuapp.com/api/restaurants?name="
          parseResults={json => (json.restaurants || []).map(item => item.name)}
          maxItems={10}
          onSelect={item => alert(item)}
        />
      </div>
    );
  }
}

export default hot(module)(App);
