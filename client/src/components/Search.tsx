import * as React from 'react';
import { FormControl, Form, Button } from 'react-bootstrap';
import autobind from 'autobind-decorator';

interface ISearchProps {
  searchTeams(filterText: string): any;
}

interface ISearchState {
  filterText: string;
}

export default class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      filterText: ''
    };
  }

  @autobind
  private _onSearch(ev: any) {
    ev.preventDefault();
    if (this.state.filterText.length > 2) {
      const promise = Promise.resolve(this.props.searchTeams(this.state.filterText));
      promise.then(data => console.log(data));
    }
  }

  @autobind
  private handleChange(ev: any) {
    this.setState({ filterText: ev.target.value });
  }

  public render() {
    return (
      <Form onSubmit={this._onSearch}>
        <FormControl
          type="text"
          value={this.state.filterText}
          placeholder="Start typing to search..."
          onChange={this.handleChange}
        />
        <Button type="submit">Search</Button>
      </Form>
    );
  }
}