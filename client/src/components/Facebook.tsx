import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import autobind from 'autobind-decorator';

interface IFacebookState {
  isLoggedIn: boolean;
  userId: string;
  name: string;
  email: string;
  pictureUrl: string;
}

export default class Facebook extends React.Component<{}, IFacebookState> {
  public state: IFacebookState = {
    isLoggedIn: false,
    userId: '',
    name: '',
    email: '',
    pictureUrl: ''
  };

  @autobind
  private _componentClicked() {
    console.log('Clicked');
  }

  @autobind
  private _responseFacebook(response: any) {
    console.log(typeof response);
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userId: response.userID,
      name: response.name,
      email: response.email,
      pictureUrl: response.picture.data.url
    });
  }

  public render() {
    let fbContent: any;

    if (!this.state.isLoggedIn) {
      fbContent = (
        <FacebookLogin
          appId="129505914269596"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this._componentClicked}
          callback={this._responseFacebook}
        />
      );
    } else {
      fbContent = (
        <div>
          <img src={this.state.pictureUrl} alt={this.state.name}/>
        </div>
      );
    }

    return (
      <div>{fbContent}</div>
    );
  }
}
