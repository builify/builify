import React, { Component, PropTypes } from 'react';
import Checkbox from '../Checkbox';

const utils = {
  inputTypeForPrototype (prototype) {
    if (prototype === Date) return 'date';
    if (prototype === Number) return 'number';
    if (prototype === Boolean) return 'checkbox';
    return 'text';
  },

  prepareValueForInput (value, type) {
    if (type === 'date') return new Date(value).toISOString().slice(0, 10);
    if (type === 'checkbox') {
      return value ? 'on' : null;
    }
    return value;
  }
};

class TableRow extends Component {
  static propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    selected: PropTypes.bool
  };

  handleInputChange = (key, type, event) => {
    const value = type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.onChange(key, value);
  };

  renderSelectCell () {
    if (this.props.onSelect) {
      return (
        <td className='ab-table__selectable'>
          <Checkbox
            checked={this.props.selected}
            onChange={this.props.onSelect} />
        </td>
      );
    }
  }

  renderCells () {
    return Object.keys(this.props.model).map((key) => {
      return <td key={key}>{this.renderCell(key)}</td>;
    });
  }

  renderCell (key) {
    const value = this.props.data[key];
    if (this.props.onChange) {
      return this.renderInput(key, value);
    } else if (value) {
      return value.toString();
    }
  }

  renderInput (key, value) {
    const inputType = utils.inputTypeForPrototype(this.props.model[key].type);
    const inputValue = utils.prepareValueForInput(value, inputType);
    const checked = inputType === 'checkbox' && value ? true : null;
    return (
      <input
        checked={checked}
        onChange={this.handleInputChange.bind(null, key, inputType)}
        type={inputType}
        value={inputValue} />
    );
  }

  render () {
    let className = 'ab-table__row';
    if (this.props.onChange) className += ' ab-table__editable';
    if (this.props.selected) className += ' ab-table__select';

    return (
      <tr  className={className}>
        { this.renderSelectCell() }
        { this.renderCells() }
      </tr>
    );
  }
}

export default TableRow;
