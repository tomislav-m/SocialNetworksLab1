import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import autobind from 'autobind-decorator';
import { updateUser } from 'src/actions/facebookActions';

interface IFacebookProps {
  setLoginStatus(isLoggedIn: boolean, name: string, userId: string, favoriteTeams: Array<any>): void;
  className?: string;
}

interface IFacebookState {
  isLoggedIn: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
  favoriteTeams: Array<any>;
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

export default class Facebook extends React.Component<IFacebookProps, IFacebookState> {
  constructor(props: IFacebookProps) {
    super(props);
  }

  public state: IFacebookState = {
    ...defaultState
  };

  public componentDidUpdate(prevProps: any, prevState: IFacebookState) {
    const updated: boolean = prevState.userId !== this.state.userId;
    if (updated) {
      this._onUpdate();
      if (!this.state.isLoggedIn) {
        return;
      }
      const user = this.state;
      const promise = updateUser(user);
      promise.then((userData) => {
        const favoriteTeams = [...userData.favoriteTeams];
        this.setState({
          favoriteTeams
        });
      }).then(() => this._onUpdate());
    }
  }

  @autobind
  private _responseFacebook(response: any) {
    console.log(response);
    if (response.error) {
      return;
    }
    this.setState({
      isLoggedIn: true,
      userId: response.userID,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      pictureUrl: response.picture.data.url
    });
    console.log(`${response.first_name} ${response.last_name} successfully logged in!`);
  }

  @autobind
  public _onLogout() {
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

  @autobind
  private _onUpdate() {
    const name: string = `${this.state.firstName} ${this.state.lastName}`;
    this.props.setLoginStatus(this.state.isLoggedIn, name, this.state.userId, this.state.favoriteTeams);
  }

  public render() {
    let fbContent: any;

    if (!this.state.isLoggedIn) {
      fbContent = (
        <span className={this.props.className}>
          <FacebookLogin
            appId="129505914269596"
            autoLoad={true}
            fields="first_name,last_name,email,picture.type(large)"
            callback={this._responseFacebook}
            size="metro"
          />
        </span>
      );
      // } else {
      //   fbContent = (
      //     <div>
      //       <img
      //         src={this.state.pictureUrl}
      //         alt={`${this.state.firstName} ${this.state.lastName}`}
      //       />
      //     </div>
      //   );
    }

    return (
      <div >{fbContent}</div>
    );
  }
}
