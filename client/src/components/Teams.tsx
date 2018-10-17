import * as React from 'react';
import autobind from 'autobind-decorator';
import TeamTile, { ITeamProps } from './TeamTile';
import { Grid, Row, Col } from 'react-bootstrap';
import Search from './Search';
import { searchTeams } from 'src/actions/teamActions';

interface ITeamsProps {
  teams?: Array<ITeamProps>;
}

export default class Teams extends React.Component<ITeamsProps, {}> {
  constructor(props: ITeamsProps) {
    super(props);
  }

  public render() {
    const { teams } = this.props;
    return (
      <div>
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
        <Search searchTeams={searchTeams} />
      </div>
    );
  }
}