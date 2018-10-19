import * as React from 'react';
import { FormControl, Form, Button, ListGroup, ListGroupItem, Tooltip, OverlayTrigger } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import { searchTeams } from 'src/actions/teamActions';
import './search.css';
import { ITeamProps } from './TeamTile';
import { addFavoriteTeam } from 'src/actions/facebookActions';

interface ISearchProps {
  addToFavorites(teamId: string): void;
}

interface ISearchState {
  filterText: string;
  teams: Array<ITeamProps>;
  filteredTeams: Array<ITeamProps>;
  searchBoxFocused: boolean;
  selectedTeam: string;
  filtered: boolean;
  searching: boolean;
}

function mapDataToTeam(data: any): ITeamProps {
  return {
    id: data.idTeam,
    name: data.strTeam,
    sport: data.strSport,
    country: data.strCountry,
    league: data.strLeague,
    facebookLink: data.strFacebook,
    twitterLink: data.strTwitter,
    website: data.strWebsite
  };
}

export default class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      filterText: '',
      teams: [],
      filteredTeams: [],
      searchBoxFocused: false,
      selectedTeam: '',
      filtered: false,
      searching: false
    };
  }

  @autobind
  private _onSearch(ev: any) {
    ev.preventDefault();
    this.setState({
      filteredTeams: [],
      searching: true
    });
    const promise = Promise.resolve(searchTeams(this.state.filterText));
    promise.then(data => {
      if (data.teams && data.teams.length > 0) {
        const teams: Array<ITeamProps> = [];
        (data.teams as Array<ITeamProps>).forEach((teamData: ITeamProps) => {
          const team = mapDataToTeam(teamData);
          teams.push(team);
        });
        this.setState({
          teams,
          filteredTeams: teams.slice(),
          filtered: true,
          searching: false
        });
      }
    });
  }

  @autobind
  private _handleChange(ev: any) {
    const newText = ev.target.value;
    const { teams, filtered } = this.state;
    this.setState({ filterText: newText, selectedTeam: '' });

    if (!filtered) {
      return;
    } else if (newText.length === 0) {
      this.setState({
        filteredTeams: []
      });
      return;
    }
    const filteredTeams: Array<ITeamProps> = [];
    teams.forEach(team => {
      if (team.name.toLowerCase().includes(newText.toLowerCase())) {
        filteredTeams.push(team);
      }
    });
    this.setState({
      filteredTeams
    });
  }

  @autobind
  private _onSearchBoxFocus() {
    this.setState({
      searchBoxFocused: true
    });
  }

  @autobind
  private _onSearchBoxBlur() {
    setTimeout(() =>
      this.setState({
        searchBoxFocused: false
      }), 200
    );
  }

  @autobind
  private _onTeamSelected(teamName: string, teamId: string) {
    this.setState({
      selectedTeam: teamId,
      filterText: teamName
    });
  }

  @autobind
  private _renderSelectionList() {
    const { filteredTeams } = this.state;
    return (
      <ListGroup className="suggestions-list">
        {filteredTeams.length > 0 ?
          filteredTeams.map(team => {
            return (
              <OverlayTrigger overlay={this._renderTooltip(team)}>
                <ListGroupItem href="#" onClick={() => this._onTeamSelected(team.name, team.id)}>
                  {team.name}
                </ListGroupItem>
              </OverlayTrigger>
            );
          }) : this.state.filtered &&
          <ListGroupItem>Nothing found...</ListGroupItem>
        }
      </ListGroup>
    );
  }

  @autobind
  private _renderTooltip(team: any) {
    return (
      <Tooltip placement="right">
        <div>
          <strong>{team.name}</strong><br />
          {team.sport}<br />
          {team.country}
        </div>
      </Tooltip>
    );
  }

  public render() {
    return (
      <div className="search-container">
        <Form onSubmit={this._onSearch} inline>
          <FormControl className="search"
            type="text"
            value={this.state.filterText}
            placeholder="Start typing to search..."
            onChange={this._handleChange}
            onFocus={this._onSearchBoxFocus}
            onBlur={this._onSearchBoxBlur}
          />
          <Button
            type="submit"
            onFocus={this._onSearchBoxFocus}
            onBlur={this._onSearchBoxBlur}
            disabled={this.state.searching}
          >Search</Button>
          {this.state.selectedTeam !== '' &&
            <Button
              disabled={this.state.searching}
              onClick={() => this.props.addToFavorites(this.state.selectedTeam)}
            >
              Follow
            </Button>
          }
          {this.state.searchBoxFocused &&
            this._renderSelectionList()
          }
        </Form>
      </div>
    );
  }
}