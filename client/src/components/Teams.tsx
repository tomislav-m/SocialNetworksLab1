import * as React from 'react';
import autobind from 'autobind-decorator';
import TeamTile, { ITeamProps } from './TeamTile';
import { Grid, Row, Col } from 'react-bootstrap';

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
      <Grid>
        <Row>
          {teams && teams.map(team =>
            <Col xs={6} md={3}>
              <TeamTile
                name={team.name}
                sport={team.sport}
              />
            </Col>
          )}
        </Row>
      </Grid>
    );
  }
}