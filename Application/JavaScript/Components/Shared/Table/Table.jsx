import React, { Component, PropTypes } from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';

class Table extends Component {
  static propTypes = {
    className: PropTypes.string,
    heading: PropTypes.bool,
    model: PropTypes.object,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    selected: PropTypes.array,
    source: PropTypes.array
  };

  static defaultProps = {
    className: '',
    heading: true,
    selected: [],
    source: []
  };

  handleFullSelect () {
    if (this.props.onSelect) {
      const {source, selected} = this.props;
      const newSelected = source.length === selected.length ? [] : source.map((i, idx) => idx);
      this.props.onSelect(newSelected);
    }
  }

  handleRowSelect (index) {
    if (this.props.onSelect) {
      const position = this.props.selected.indexOf(index);
      const newSelected = [...this.props.selected];
      if (position !== -1) newSelected.splice(position, 1); else newSelected.push(index);
      this.props.onSelect(newSelected);
    }
  };

  handleRowChange (index, key, value) {
    if (this.props.onChange) {
      this.props.onChange(index, key, value);
    }
  }

  renderHead () {
    if (this.props.heading) {
      const { model, selected, source } = this.props;
      const isSelected = selected.length === source.length;

      return (
        <TableHead
          model={model}
          onSelect={::this.handleFullSelect}
          selected={isSelected} />
      );
    }
  }

  renderBody () {
    const rows = this.props.source.map((data, idx) => {
      return (
        <TableRow
          data={data}
          index={idx}
          key={idx}
          model={this.props.model}
          onChange={this.props.onChange ? this.handleRowChange.bind(this, idx) : null}
          onSelect={this.handleRowSelect.bind(this, idx)}
          selected={this.props.selected.indexOf(idx) !== -1} />
      );
    });

    return <tbody>{rows}</tbody>;
  }

  render () {
    let className = 'ab-table';
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <table data-react-toolbox='table' className={className}>
        { this.renderHead() }
        { this.renderBody() }
      </table>
    );
  }
}

export default Table;
