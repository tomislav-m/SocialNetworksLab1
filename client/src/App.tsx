import * as React from 'react';
import './App.css';

import Facebook from './components/Facebook';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import { createRef } from 'react';
import Teams from './components/Teams';

interface IAppState {
  isLoggedIn: boolean;
  name: string;
  userId: string;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    isLoggedIn: false,
    name: '',
    userId: ''
  };

  private myRef: React.RefObject<Facebook> = createRef<Facebook>();

  @autobind
  private setLogged(isLoggedIn: boolean, name: string, userId: string) {
    this.setState({
      isLoggedIn,
      name,
      userId
    });
  }

  @autobind
  private _logout() {
    if (this.myRef.current) {
      this.myRef.current._onLogout();
    }
  }

  public render() {
    const { isLoggedIn } = this.state;
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>SportsDataApp</Navbar.Brand>
          </Navbar.Header>
          {isLoggedIn &&
            <Nav pullRight>
              <NavItem>
                {this.state.name}
              </NavItem>
              <NavItem href="#" onClick={this._logout}>
                Logout
              </NavItem>
            </Nav>
          }
        </Navbar>
        <Facebook
          setLoginStatus={this.setLogged}
          ref={this.myRef}
        />
        {isLoggedIn &&
          <Teams user={this.state.userId} />
        }
      </div>
    );
  }
}

export default App;
