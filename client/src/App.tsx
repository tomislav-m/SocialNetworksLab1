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
  favoriteTeamsIds: Array<any>;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    isLoggedIn: false,
    name: '',
    userId: '',
    favoriteTeamsIds: []
  };

  private myRef: React.RefObject<Facebook> = createRef<Facebook>();

  @autobind
  private setLogged(isLoggedIn: boolean, name: string, userId: string, favoriteTeamsIds: Array<any>) {
    this.setState({
      isLoggedIn,
      name,
      userId,
      favoriteTeamsIds
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
          className="fb"
        />
        {isLoggedIn &&
          <Teams user={this.state.userId} teamsIds={this.state.favoriteTeamsIds} />
        }
      </div>
    );
  }
}

export default App;
