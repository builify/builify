import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import Ripple from './Ripple';

const _selectValue = (value, dataSource) => {
  let item;
  if (value) {
    for (item of dataSource) {
      if (item.value.toString() === value.toString()) break;
    }
    return item;
  } else {
    return dataSource[0];
  }
};

class Dropdown extends Component {
  static propTypes = {
    auto: PropTypes.bool,
    className: PropTypes.string,
    dataSource: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    template: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    auto: true,
    className: '',
    disabled: false
  };

  state = {
    active: false,
    selected: _selectValue(this.props.value, this.props.dataSource),
    up: false,
    width: undefined
  };

  componentDidMount () {
    this.setState({
      width: findDOMNode(this).getBoundingClientRect().width
    });
  }

  componentDidUpdate (prev_props, prev_state) {
    if (this.props.onChange && prev_state.selected !== this.state.selected && prev_state.active) {
      this.props.onChange(this);
    }
  }

  handleClick = (event) => {
    const client = event.target.getBoundingClientRect();
    const screen_height = window.innerHeight || document.documentElement.offsetHeight;
    const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
    this.setState({ active: true, up: up });
  };

  handleClickValue = (id) => {
    if (!this.props.disabled) {
      const value = id.toString();
      for (const item of this.props.dataSource) {
        if (item.value.toString() === value) {
          this.setState({active: false, selected: item});
          break;
        }
      }
    }
  };

  renderValues () {
    const items = this.props.dataSource.map((item, index) => {
      let className;
      if (item.value === this.state.selected.value) className = ` selected`;

      return (
        <li
          key={index}
          className={className}
          id={item.value}
          onClick={this.handleClickValue.bind(this, item.value)} >
          { this.props.template ? this.props.template(item) : item.label }
          <Ripple className='ripple'/>
        </li>
      );
    });

    let className = 'ab-dropdown__values'
    const valuesStyle = {width: this.state.width};
    if (this.state.up) className += ` up`;

    return (
      <ul
        ref='values'
        className={className}
        style={valuesStyle}>
        { items }
      </ul>
    )
  }

  render () {
    let className = 'ab-dropdown';
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.disabled) className += ` disabled`;
    if (this.state.active) className += ` active`;

    return (
      <div className={className}>
        {this.props.label ? <label className='ab-dropdown__label'>{this.props.label}</label> : null}
        { this.renderValues() }
        <div ref='value' className='ab-dropdown__value' onClick={this.handleClick}>
          { this.props.template ? this.props.template(this.state.selected) : <span>{this.state.selected.label}</span> }
        </div>
      </div>
    );
  }

  getValue () {
    return this.state.selected.value;
  }

  setValue (data) {
    this.setState({selected: data});
  }
}

export default Dropdown;
