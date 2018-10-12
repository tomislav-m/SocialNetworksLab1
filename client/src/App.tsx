import * as React from 'react';
import './App.css';

import Facebook from './components/Facebook';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://i2.wp.com/reactscript.com/wp-content/uploads/2016/06/React-Components-For-The-Web-Animations-API.gif" className="App-logo" alt="logo" />
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
