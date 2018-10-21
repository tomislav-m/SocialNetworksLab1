import * as React from 'react';
import { Panel, ListGroup, ListGroupItem, Image, Tabs, Tab } from 'react-bootstrap';
import { getNextMatch, getLastMatch } from '../actions/teamActions';
import autobind from 'autobind-decorator';

function mapDataToMatch(data: any): Match {
  return {
    homeTeam: data.strHomeTeam,
    awayTeam: data.strAwayTeam,
    competition: data.strLeague,
    date: data.dateEvent,
    homeScore: data.intHomeScore,
    awayScore: data.intAwayScore
  };
}

interface Match {
  homeTeam: string;
  homeScore: string;
  awayTeam: string;
  awayScore: string;
  competition: string;
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
  logoUrl?: string;
}

interface ITeamState {
  nextMatches: Array<Match>;
  lastMatches: Array<Match>;
}

export class TeamTile extends React.Component<ITeamProps, ITeamState> {
  constructor(props: ITeamProps) {
    super(props);

    this.state = {
      lastMatches: [],
      nextMatches: []
    };
  }

  public componentDidMount() {
    if (this.state.lastMatches.length !== 0 && this.state.nextMatches.length !== 0) {
      return;
    }
    getNextMatch(this.props.id).then(next => {
      const nextMatches = next.events.map(mapDataToMatch);
      getLastMatch(this.props.id).then(last => {
        const lastMatches = last.results.map(mapDataToMatch);
        this.setState({
          lastMatches,
          nextMatches
        });
      });
    });
  }

  @autobind
  private formatText(teamName1: string, teamName2: string): any {
    if (teamName1 === teamName2) {
      return (
        <strong>{teamName2}</strong>
      );
    } else {
      return teamName2;
    }
  }

  public render() {
    const { name, sport, logoUrl, league, country,
      facebookLink, twitterLink, website } = this.props;

    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">{name}</Panel.Title>
          </Panel.Heading>
          <ListGroup>
            <ListGroupItem>
              <Image
                src={logoUrl}
                width={50}
                alt={name}
              />
            </ListGroupItem>
          </ListGroup>
          <Tabs defaultActiveKey={1} id={name}>
            <Tab eventKey={1} title="Info">
              <ListGroup>
                <ListGroupItem>
                  {sport}<br />
                  {league} ({country})
              </ListGroupItem>
                <ListGroupItem>
                  <a href={website}>{website}</a><br />
                  <a href={facebookLink}>{facebookLink}</a><br />
                  <a href={twitterLink}>{twitterLink}</a>
                </ListGroupItem>
              </ListGroup>
            </Tab>
            <Tab eventKey={2} title={`Last ${this.state.lastMatches.length}`}>
              <ListGroup>
                {this.state.lastMatches.map(match => {
                  return (
                    <ListGroupItem>
                      {this.formatText(name, match.homeTeam)} {match.homeScore} : {match.awayScore} {this.formatText(name, match.awayTeam)} - {match.date} ({match.competition})
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Tab>
            <Tab eventKey={3} title={`Next ${this.state.lastMatches.length}`}>
              <ListGroup>
                {this.state.nextMatches.map(match => {
                  return (
                    <ListGroupItem>
                      {this.formatText(name, match.homeTeam)} vs {this.formatText(name, match.awayTeam)} - {match.date} ({match.competition})
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Tab>
          </Tabs>
        </Panel>
      </div >
    );
  }
}