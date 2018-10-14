import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import autobind from 'autobind-decorator';
import { getUser, saveUser } from 'src/actions/facebookActions';

interface IFacebookState {
  isLoggedIn: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
  favoriteTeams: Array<string>;
}

const defaultState: IFacebookState = {
  isLoggedIn: false,
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  pictureUrl: '',
  favoriteTeams: []
};

export default class Facebook extends React.Component<{}, IFacebookState> {
  public state: IFacebookState = {
    ...defaultState
  };

  public componentDidUpdate(prevProps: any, prevState: IFacebookState) {
    const updated: boolean = prevState.userId !== this.state.userId;
    if (!this.state.isLoggedIn || !updated) {
      return;
    }
    getUser(this.state.userId)
      .then((user: any) => {
        if (user) {
          return;
        }
        user = this.state;
        saveUser(user)
          .then(() => {
            console.log(`${user.firstName} ${user.lastName} successfully registered!`);
          });
      });
  }

  @autobind
  private _responseFacebook(response: any) {
    if (response.error) {
      return;
    }
    this.setState({
      isLoggedIn: true,
      userId: response.userID,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      pictureUrl: response.picture.data.url,
      favoriteTeams: (response.favorite_teams as Array<any>).map(team => team.name)
    });
    console.log(`${response.first_name} ${response.last_name} successfully logged in!`);
  }

  @autobind
  private _onLogout() {
    if (this.state.isLoggedIn) {
      const promise = new Promise((resolve, reject) => {
        (window as any).FB.logout();
        resolve();
      });
      promise.then(() => {
        this.setState({
          ...defaultState
        });
      })
        .then(() => {
          console.log('Logged out!');
        });
    }
  }

  public render() {
    let fbContent: any;

    if (!this.state.isLoggedIn) {
      fbContent = (
        <FacebookLogin
          appId="129505914269596"
          autoLoad={true}
          fields="first_name,last_name,email,picture.type(large),favorite_teams"
          callback={this._responseFacebook}
          size="metro"
        />
      );
    } else {
      fbContent = (
        <div>
          <img
            src={this.state.pictureUrl}
            alt={`${this.state.firstName} ${this.state.lastName}`}
          />
          <button onClick={this._onLogout}>Logout</button>
        </div>
      );
    }

    return (
      <div>{fbContent}</div>
    );
  }
}
