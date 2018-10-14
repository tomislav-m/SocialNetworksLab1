import * as React from 'react';
import './App.css';

import Facebook from './components/Facebook';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">Facebook</h1>
        </header>
        <p className="App-intro">
          To get started, authenticate with Facebook.
        </p>
        <Facebook/>
      </div>
    );
  }
}

export default App;
