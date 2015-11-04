import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterContentBlocks } from '../../Actions/ActionCreators';
import _ from 'lodash';
import cx from 'classnames';

class Filter extends Component {
  state = {
    isFilterOpened: false,
    activeTargetId: 0,
    target: null
  };

  openOrCloseFilter () {
    this.setState({
      isFilterOpened: !this.state.isFilterOpened
    });
  }

  filterEvent (e) {
    e.preventDefault();

    this.openOrCloseFilter();
  }

  renderFilterItems () {
    const { template, builder, onFilterItemSelection } = this.props;
    const { filterContentBlocksTarget } = builder;
    let items = [];

    if (_.has(template, 'blocks')) {
      const { blocks } = template;

      _.map(blocks, (block) => {
        const { type } = block;
        items.push({
          name: String(type),
          target: type
        });
      });

      items = _.sortByOrder(items, ['name'], 'asc');

      items.unshift({
        name: 'Show All',
        target: 'all'
      });

      return (
        <ul>
          {_.map(items, (item, i) => {
            const { name, target } = item;
            let isActive = false;

            if (_.has(item, 'active')) {
              if (item.active) {
                isActive = true;
              }
            }

            const itemClassName = cx(target == filterContentBlocksTarget ? 'active' : '');

            return (
              <li
                key={'filterItem-' + i}
                onClick={(e) => {
                  e.preventDefault();

                  this.openOrCloseFilter();

                  return onFilterItemSelection(target);
                }}
                className={itemClassName}>
                {name}
              </li>
            )
          })}
        </ul>
      )
    }

    return null;
  }

  render () {
    const filterClassName = cx('ab-filter', this.state.isFilterOpened ? 'active' : '');

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

function mapStateToProps (state) {
  return {
    template: state.template,
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onFilterItemSelection: (target) => {
      dispatch(filterContentBlocks(target));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
