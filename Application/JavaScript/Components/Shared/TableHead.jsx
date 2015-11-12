import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox';

class Head extends Component {
  static propTypes = {
    className: PropTypes.string,
    model: PropTypes.object,
    onSelect: PropTypes.func,
    selected: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    model: {},
    selected: false
  };

  handleSelectChange = (event) => {
    this.props.onSelect(event);
  };

  renderCellSelectable () {
    if (this.props.onSelect) {
      return (
        <th className='ab-table__selectable'>
          <Checkbox
            onChange={this.handleSelectChange}
            checked={this.props.selected} />
        </th>
      );
    }
  }

  render () {
    return (
      <thead className={this.props.className}>
        <tr>
        { this.renderCellSelectable() }
        {
          Object.keys(this.props.model).map((key) => {
            return (<th key={key}>{key}</th>);
          })
        }
        </tr>
      </thead>
    );
  }
}

export default Head;
