import * as React from 'react';
import './App.css';

import Facebook from './components/Facebook';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import { createRef } from 'react';

interface IAppState {
  isLoggedIn: boolean;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    isLoggedIn: false
  };

  private myRef: React.RefObject<Facebook> = createRef<Facebook>();

  @autobind
  private setLogged(isLoggedIn: boolean) {
    this.setState({
      isLoggedIn
    });
  }

  @autobind
  private _logout() {
    if (this.myRef.current) {
      this.myRef.current._onLogout();
    }
  }

  public render() {
    return (
      <div className="App">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>SportsDataApp</Navbar.Brand>
          </Navbar.Header>
          {this.state.isLoggedIn &&
            <Nav pullRight>
              <NavItem href="#" onClick={this._logout}>
                Logout
              </NavItem>
            </Nav>
          }
        </Navbar>
        <p className="App-intro">
          To get started, authenticate with Facebook.
        </p>
        <Facebook
          setLoginStatus={this.setLogged}
          ref={this.myRef}
        />
      </div>
    );
  }
}

export default App;
