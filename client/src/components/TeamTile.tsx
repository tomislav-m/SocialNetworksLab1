import * as React from 'react';
import { Panel, ListGroup, ListGroupItem, Image, Tabs, Tab, Button } from 'react-bootstrap';
import { getNextMatch, getLastMatch } from '../actions/teamActions';
import autobind from 'autobind-decorator';
import './TeamTile.css';

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
  youtubeLink?: string;
  logoUrl?: string;
  stadium?: string;
  onStadiumClick(stadium: string, team: string): void;
  onUnfollow(team: any): void;
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
      let nextMatches: any;
      if (next.events != null) {
        nextMatches = next.events.map(mapDataToMatch);
      }
      getLastMatch(this.props.id).then(last => {
        let lastMatches: any;
        if (last.results != null) {
          lastMatches = last.results.map(mapDataToMatch);
        }
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
    const { name, sport, logoUrl, league, country, stadium, onUnfollow, id,
      facebookLink, twitterLink, website, youtubeLink, onStadiumClick } = this.props;

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
              <Button onClick={() => onUnfollow(id)} className="unfollow-btn">
                Unfollow
              </Button>
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
                  <a href={website}>{website}</a> <br />
                  <a href={facebookLink}>{facebookLink}</a><br />
                  <a href={twitterLink}>{twitterLink}</a><br />
                  <a href={youtubeLink}>{youtubeLink}</a><br /><br />
                  <strong>Stadium: </strong>
                  <a href="#">
                    <span className="mapLink" title="Show on map" onClick={() => onStadiumClick(stadium as string, name as string)}>
                      {stadium}
                    </span>
                  </a>
                </ListGroupItem>
              </ListGroup>
            </Tab>
            {this.state.lastMatches &&
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
            }
            {
              this.state.nextMatches &&
              <Tab eventKey={3} title={`Next ${this.state.nextMatches.length}`}>
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
            }
          </Tabs>
        </Panel>
      </div >
    );
  }
}