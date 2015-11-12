import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Head from './TableHead';
import Row from './TableRow';

class Table extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.array,
    model: PropTypes.object,
    heading: PropTypes.bool,
    onChange: PropTypes.func,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    className: '',
    dataSource: [],
    heading: true
  };

  state = {
    dataSource: _.clone(this.props.dataSource),
    selected: false,
    selected_rows: []
  };

  componentWillReceiveProps = (next_props) => {
    if (next_props.dataSource) {
      this.setState({dataSource: _.clone(next_props.datasSource)});
    }
  };

  handleRowChange = (event, row, key, value) => {
    const dataSource = this.state.dataSource;
    dataSource[row.props.index][key] = value;
    this.setState({ dataSource: dataSource });
    if (this.props.onChange) {
      this.props.onChange(event, this, row);
    }
  };

  handleRowSelect = (event, instance) => {
    if (this.props.onSelect) {
      const index = instance.props.index;
      const selected_rows = this.state.selected_rows;
      const selected = selected_rows.indexOf(index) === -1;
      if (selected) {
        selected_rows.push(index);
        this.props.onSelect(event, instance.props.data);
      } else {
        delete selected_rows[selected_rows.indexOf(index)];
      }
      this.setState({ selected_rows: selected_rows });
    }
  };

  handleRowsSelect = () => {
    this.setState({ selected: !this.state.selected });
  };

  isChanged = (data, base) => {
    let changed = false;
    Object.keys(data).map((key) => {
      if (data[key] !== base[key]) {
        changed = true;
      }
    });
    return changed;
  };

  renderHead () {
    if (this.props.heading) {
      return (
        <Head
          model={this.props.model}
          onSelect={this.props.onSelect ? this.handleRowsSelect : null}
          selected={this.state.selected} />
      );
    }
  }

  renderBody () {
    return (
      <tbody>
      {
        this.state.dataSource.map((data, index) => {
          return (
            <Row
              changed={this.isChanged(data, this.props.dataSource[index])}
              data={data}
              index={index}
              key={index}
              model={this.props.model}
              onChange={this.props.onChange ? this.handleRowChange : null}
              onSelect={this.props.onSelect ? this.handleRowSelect : null}
              selected={this.state.selected || this.state.selected_rows.indexOf(index) !== -1}
            />
          );
        })
      }
      </tbody>
    );
  }

  render () {
    const className = `${this.props.className} ab-table`;
    return (
      <table className={className}>
        { this.renderHead() }
        { this.renderBody() }
      </table>
    );
  }

  getValue () {
    return this.state.dataSource;
  }

  getSelected () {
    const rows = [];
    this.state.dataSource.map((row, index) => {
      if (this.state.selected_rows.indexOf(index) !== -1) rows.push(row);
    });
    return rows;
  }
}

export default Table;
