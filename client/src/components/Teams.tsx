import * as React from 'react';
import autobind from 'autobind-decorator';
import { TeamTile } from './TeamTile';
import { Grid, Row, Col } from 'react-bootstrap';
import Search, { mapDataToTeam } from './Search';
import { addFavoriteTeam } from 'src/actions/facebookActions';
import { getTeamDetails } from '../actions/teamActions';

interface ITeamsProps {
  teamsIds: Array<any>;
  user: string;
}

interface ITeamsState {
  teams: Array<any>;
}

export default class Teams extends React.Component<ITeamsProps, ITeamsState> {
  constructor(props: ITeamsProps) {
    super(props);

    this.state = {
      teams: []
    };
  }
  public componentDidUpdate(prevProps: ITeamsProps) {
    if (prevProps === this.props) {
      return;
    }
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

  public render() {
    const { teams } = this.state;
    return (
      <div>
        <Search addToFavorites={this._addFavoriteTeam} />
        <Grid>
          <Row>
            {teams.length > 0 && teams.map((team) =>
              <Col xs={6} md={3}>
                <TeamTile
                  id={team.id}
                  name={team.name}
                  sport={team.sport}
                  logoUrl={team.logoUrl}
                />
              </Col>
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}