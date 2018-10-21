import * as React from 'react';
import { FormControl, Form, Button, ListGroup, ListGroupItem, Tooltip, OverlayTrigger, FormGroup, InputGroup } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import { searchTeams } from 'src/actions/teamActions';
import './search.css';

interface ISearchProps {
  addToFavorites(team: any): void;
}

interface ISearchState {
  filterText: string;
  teams: Array<any>;
  filteredTeams: Array<any>;
  searchBoxFocused: boolean;
  selectedTeam: any;
  filtered: boolean;
  searching: boolean;
}

export function mapDataToTeam(data: any): any {
  return {
    id: data.idTeam,
    name: data.strTeam,
    sport: data.strSport,
    country: data.strCountry,
    league: data.strLeague,
    facebookLink: data.strFacebook,
    twitterLink: data.strTwitter,
    website: data.strWebsite,
    logoUrl: data.strTeamBadge
  };
}

const defaultTeam = {
  id: '',
  name: '',
  sport: '',
  country: '',
  league: '',
  facebookLink: '',
  twitterLink: '',
  website: ''
};

export default class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      filterText: '',
      teams: [],
      filteredTeams: [],
      searchBoxFocused: false,
      selectedTeam: defaultTeam,
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
        const teams: Array<any> = [];
        (data.teams as Array<any>).forEach((teamData: any) => {
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
    this.setState({ filterText: newText, selectedTeam: defaultTeam });

    if (!filtered) {
      return;
    } else if (newText.length === 0) {
      this.setState({
        filteredTeams: []
      });
      return;
    }
    const filteredTeams: Array<any> = [];
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
  private _onTeamSelected(team: any) {
    this.setState({
      selectedTeam: team,
      filterText: team.name
    });
  }

  @autobind
  private _renderSelectionList() {
    const { filteredTeams } = this.state;
    return (
      <ListGroup className="suggestions-list">
        {filteredTeams.length > 0 ?
          filteredTeams.map((team, index) => {
            return (
              <OverlayTrigger overlay={this._renderTooltip(team)} key={index}>
                <ListGroupItem href="#" onClick={() => this._onTeamSelected(team)}>
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
      <div>
        <Form onSubmit={this._onSearch} inline>
          <FormGroup>
            <InputGroup>
              <FormGroup>
                <FormControl
                  type="text"
                  value={this.state.filterText}
                  placeholder="Start typing to search..."
                  onChange={this._handleChange}
                  onFocus={this._onSearchBoxFocus}
                  onBlur={this._onSearchBoxBlur}
                />
              </FormGroup>
              <InputGroup.Button>
                <Button
                  type="submit"
                  onFocus={this._onSearchBoxFocus}
                  onBlur={this._onSearchBoxBlur}
                  disabled={this.state.searching}
                >Search</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
          {this.state.selectedTeam !== defaultTeam &&
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