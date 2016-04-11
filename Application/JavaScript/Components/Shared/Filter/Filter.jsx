import { connect } from 'react-redux';
import { filterContentBlocks } from '../../../Actions';
import React from 'react';
import Icon from '../Icon';
import orderBy from 'lodash/orderby';
import has from 'lodash/has';
import map from 'lodash/map';
import classNames from 'classnames';

class Filter extends React.Component {
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

    if (has(template, 'blocks')) {
      const { blocks } = template;

      map(blocks, (block) => {
        const { type } = block;
        items.push({
          name: String(type),
          target: type
        });
      });

      items = orderBy(items, ['name'], 'asc');

      items.unshift({
        name: 'Show All',
        target: 'all'
      });

      return (
        <ul>
          { map(items, (item, i) => {
            const { name, target } = item;

            if (has(item, 'active')) {
              if (item.active) {
                isActive = true;
              }
            }

            const itemClassName = classNames(target === filterContentBlocksTarget ? 'active' : '');

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
            );
          }) }
        </ul>
      );
    }

    return null;
  }

  render () {
    const { isFilterOpened } = this.state;
    const filterClassName = classNames('ab-filter', isFilterOpened ? 'active' : '');
    const filterIcon = () => {
      return (
        <Icon
          icon={isFilterOpened ? 'expand-less' : 'expand-more'}
          size='24' />
      );
    };

    return (
      <div className={filterClassName}>
        <div
          className='ab-filter__text'
          onClick={::this.filterEvent}>
          <span>Filter</span>
          { filterIcon() }
        </div>
        <div className='ab-filter__items'>
          {this.renderFilterItems()}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    template: state.template,
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onFilterItemSelection: (target) => {
      dispatch(filterContentBlocks(target));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter);
