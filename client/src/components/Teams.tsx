import * as React from 'react';
import autobind from 'autobind-decorator';
import { TeamTile } from './TeamTile';
import { Grid, Row, Col } from 'react-bootstrap';
import Search, { mapDataToTeam } from './Search';
import { addFavoriteTeam, unfollowTeam } from 'src/actions/facebookActions';
import { getTeamDetails } from '../actions/teamActions';
import { getLocation } from '../actions/mapActions';

interface ITeamsProps {
  teamsIds: Array<any>;
  user: string;
}

interface ITeamsState {
  teams: Array<any>;
  stadiumLat: string;
  stadiumLon: string;
  map: any;
}

export default class Teams extends React.Component<ITeamsProps, ITeamsState> {
  constructor(props: ITeamsProps) {
    super(props);

    this.state = {
      teams: [],
      stadiumLat: '',
      stadiumLon: '',
      map: null
    };
  }

  public componentDidMount() {
    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
    document.body.appendChild(script);
    script.async = true;
    script.onload = () => {
      const map = (window as any).tomtom.L.map('map', {
        source: 'vector',
        key: 'BUfJt7rnilkTxyeZ90xXDwhgx1JEzcwY',
        center: [37.769167, -122.478468],
        basePath: '/sdk',
        zoom: 16
      });
      this.setState({
        map
      });
    };
  }

  public componentDidUpdate(prevProps: ITeamsProps, prevState: ITeamsState) {
    if (prevProps !== this.props) {
      for (const id of this.props.teamsIds) {
        getTeamDetails(id).then(data => {
          const team = mapDataToTeam(data.teams[0]);
          const teams = this.state.teams.slice();
          teams.push(team);
          this.setState({
            teams
          });
        });
      }
    }
    if (prevState.stadiumLat !== this.state.stadiumLat || prevState.stadiumLon !== this.state.stadiumLon) {
      this.state.map.setView([this.state.stadiumLat, this.state.stadiumLon], 16);
    }
  }

  @autobind
  private _addFavoriteTeam(team: any) {
    addFavoriteTeam(this.props.user, team.id).then(() => {
      const teams = this.state.teams.slice();
      teams.push(team);
      this.setState({
        teams
      });
    });
  }

  @autobind
  private _unfollowTeam(teamId: string) {
    unfollowTeam(this.props.user, teamId).then(() => {
      const index = this.state.teams.findIndex(x => x.id === teamId);
      const teams = this.state.teams.slice();
      teams.splice(index, 1);
      this.setState({
        teams
      });
    });
  }

  @autobind
  private _onStadiumClick(stadium: string, team: string) {
    getLocation(stadium, team).then(data => {
      const stadiumLat = data.results[0].position.lat;
      const stadiumLon = data.results[0].position.lon;
      this.setState({
        stadiumLat,
        stadiumLon
      });
    });
  }

  public render() {
    const { teams } = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} md={4} id="leftCol">
              <Search addToFavorites={this._addFavoriteTeam} />
              <div id="map"></div>
            </Col>
            <Col xs={6} md={8} id="rightCol">
              {teams.length > 0 && teams.map((team, index) =>
                <Col xs={12} md={6} id={'col' + index}>
                  <TeamTile
                    id={team.id}
                    name={team.name}
                    sport={team.sport}
                    logoUrl={team.logoUrl}
                    league={team.league}
                    country={team.country}
                    facebookLink={team.facebookLink}
                    twitterLink={team.twitterLink}
                    website={team.website}
                    youtubeLink={team.youtubeLink}
                    stadium={team.stadium}
                    onStadiumClick={this._onStadiumClick}
                    onUnfollow={this._unfollowTeam}
                  />
                </Col>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}