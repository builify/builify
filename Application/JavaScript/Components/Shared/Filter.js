import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

class Filter extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isFilterOpened: false
    };
  }

  filterEvent (e) {
    e.preventDefault();

    this.setState({
      isFilterOpened: !this.state.isFilterOpened
    });
  }

  renderFilterItems () {
    return (
      <ul>
        <li className='active'>Show all</li>
        <li>Navigation</li>
        <li>Banner</li>
        <li>Footer</li>
      </ul>
    )
  }

  render () {
    const filterClassName = classNames('ab-filter', this.state.isFilterOpened ? 'active' : '');

    return (
      <div className={filterClassName}>
        <div 
          className='ab-filter__text'
          onClick={::this.filterEvent}>
          <div>{'Filter'}</div>
        </div>
        <div className='ab-filter__items'>
          {this.renderFilterItems()}
        </div>
      </div>
    )
  }
}

export default Filter;