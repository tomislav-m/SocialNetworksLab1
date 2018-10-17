import * as React from 'react';
import './App.css';

import Facebook from './components/Facebook';
import TeamTile, { ITeamProps } from './components/TeamTile';
import { Navbar, Nav, NavItem, Image, Grid, Row, Col } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import { createRef } from 'react';
import Teams from './components/Teams';

const data: Array<ITeamProps> = [
  { id: '0', name: 'Barcelona', sport: 'Football' }
  // { id: '1', name: 'Real Madrid', sport: 'Football' },
  // { id: '2', name: 'Sevilla', sport: 'Football' },
  // { id: '3', name: 'Valencia', sport: 'Football' },
  // { id: '4', name: 'Atletico Madrid', sport: 'Football' }
];

interface IAppState {
  isLoggedIn: boolean;
  name: string;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    isLoggedIn: false,
    name: ''
  };

  private myRef: React.RefObject<Facebook> = createRef<Facebook>();

  @autobind
  private setLogged(isLoggedIn: boolean, name: string) {
    this.setState({
      isLoggedIn,
      name
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
          <Teams teams={data}/>
        }
      </div>
    );
  }
}

export default App;
