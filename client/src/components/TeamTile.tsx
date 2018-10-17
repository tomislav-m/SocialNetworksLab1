import * as React from 'react';
import autobind from 'autobind-decorator';
import { Panel, ListGroup, ListGroupItem, Image } from 'react-bootstrap';

interface Match {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  result: string;
  date: Date;
}

export interface ITeamProps {
  id: string;
  name: string;
  sport: string;
  country?: string;
  league?: string;
  website?: string;
  facebookLink?: string;
  twitterLink?: string;
}

interface ITeamState {
  matches: Array<Match>;
}

export default class TeamTile extends React.Component<ITeamProps, ITeamState> {
  constructor(props: ITeamProps) {
    super(props);
  }

  public state: ITeamState = {
    matches: []
  };

  public render() {
    const { name, sport } = this.props;

    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">{name}</Panel.Title>
          </Panel.Heading>
          <ListGroup>
            <ListGroupItem>
              <Image
                src="https://i.ebayimg.com/images/g/GwgAAOSwxVpZkEqJ/s-l640.png"
                width={50}
              />
            </ListGroupItem>
            <ListGroupItem><strong>Sport: </strong>{sport}</ListGroupItem>
          </ListGroup>
        </Panel>
      </div>
    );
  }
}