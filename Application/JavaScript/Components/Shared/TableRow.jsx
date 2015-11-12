import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox';

// Private
const _castType = (type) => {
  let input_type = 'text';
  if (type === Date) {
    input_type = 'date';
  } else if (type === Number) {
    input_type = 'number';
  } else if (type === Boolean) {
    input_type = 'checkbox';
  }
  return input_type;
};

const _castValue = (value, type) => {
  let cast = value;
  if (value && type === Date) {
    cast = new Date(value).toISOString().slice(0, 10);
  }
  return cast;
};

class Row extends Component {
  static propTypes = {
    changed: PropTypes.bool,
    className: PropTypes.string,
    data: PropTypes.object,
    index: PropTypes.number,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    selected: PropTypes.bool
  };

  static defaultProps = {
    className: ''
  };

  handleInputChange = (key, event) => {
    this.props.onChange(event, this, key, event.target.value);
  };

  handleSelectChange = (event) => {
    this.props.onSelect(event, this);
  };

  renderCell (key) {
    let value = this.props.data[key];

    if (this.props.onChange) {
      const attr = this.props.model[key];
      value = _castValue(value, attr.type);

      return (
        <input
          type={_castType(attr.type)}
          value={value}
          onChange={this.handleInputChange.bind(null, key)} />
      );
    } else {
      return value;
    }
  }

  renderCellSelectable () {
    if (this.props.onSelect) {
      return (
        <td className='ab-table__selectable'>
          <Checkbox
            onChange={this.handleSelectChange}
            checked={this.props.selected} />
        </td>
      );
    }
  }

  render () {
    let className = `${this.props.className} ab-table__row`;
    if (this.props.onChange) className += ` ab-table__editable`;
    if (this.props.selected) className += ` ab-table__select`;

    return (
      <tr data-react-toolbox-table='row' className={className}>
      { this.renderCellSelectable() }
      {
        Object.keys(this.props.model).map((key) => {
          return (<td key={key}>{this.renderCell(key)}</td>);
        })
      }
      </tr>
    );
  }
}

export default Row;
