import React from 'react';
import Table from '../../shared/Table';

export default class TablePages extends React.Component {
  static propTypes = {
    model: React.PropTypes.object.isRequired,
    source: React.PropTypes.array.isRequired
  };

  state = {
    selected: [],
    source: this.props.source
  };

  handleChange (row, key, value) {
    const { source } = this.state;

    source[row][key] = value;

    this.setState({ source });
  }

  handleSelect (selected) {
    this.setState({ selected });
  }

  getSelected () {
    return this.state.selected;
  }

  render () {
    return (
      <Table
        model={this.props.model}
        onChange={::this.handleChange}
        onSelect={::this.handleSelect}
        selected={this.state.selected}
        source={this.state.source} />
    );
  }
}
