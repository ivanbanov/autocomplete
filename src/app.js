import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <div>test</div>
    );
  }
}

export default hot(module)(App);
