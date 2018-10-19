import * as React from 'react';
import autobind from 'autobind-decorator';
import TeamTile, { ITeamProps } from './TeamTile';
import { Grid, Row, Col } from 'react-bootstrap';
import Search from './Search';
import { searchTeams } from 'src/actions/teamActions';
import { addFavoriteTeam } from 'src/actions/facebookActions';

interface ITeamsProps {
  teams?: Array<ITeamProps>;
  user: string;
}

export default class Teams extends React.Component<ITeamsProps, {}> {
  constructor(props: ITeamsProps) {
    super(props);
  }

  @autobind
  private _addFavoriteTeam(teamId: string) {
    addFavoriteTeam(this.props.user, teamId);
  }

  public render() {
    const { teams } = this.props;
    return (
      <div>
        <Search addToFavorites={this._addFavoriteTeam} />
        <Grid>
          <Row>
            {teams && teams.map(team =>
              <Col xs={6} md={3}>
                <TeamTile
                  id="0"
                  name={team.name}
                  sport={team.sport}
                />
              </Col>
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}