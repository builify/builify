import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../shared/table';

export default class TablePages extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    source: PropTypes.array.isRequired
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
