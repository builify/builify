import React from 'react';
import Icon from '../../shared/icon';
import _orderBy from 'lodash/orderby';
import _has from 'lodash/has';
import _map from 'lodash/map';
import classNames from '../../../common/classnames';
import { connect } from 'react-redux';
import { filterContentBlocks } from '../../../actions';

class Filter extends React.Component {
  static propTypes = {
    template: React.PropTypes.object.isRequired,
    builder: React.PropTypes.object.isRequired,
    filterContentBlocks: React.PropTypes.func.isRequired
  };

  state = {
    isFilterOpened: false,
    activeTargetId: 0,
    target: null
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.isFilterOpened !== nextState.isFilterOpened) {
      return true;
    }

    return false;
  }

  toggleFilter () {
    this.setState({
      isFilterOpened: !this.state.isFilterOpened
    });
  }

  renderFilterItems () {
    const { template, builder } = this.props;
    const { filterContentBlocksTarget } = builder;
    let items = [];

    if (_has(template, 'blocks')) {
      const { blocks } = template;

      _map(blocks, (block) => {
        const { type } = block;
        items.push({
          name: String(type),
          target: type
        });
      });

      items = _orderBy(items, ['name'], 'asc');

      items.unshift({
        name: 'Show All',
        target: 'all'
      });

      return (
        <ul>
          { _map(items, (item, i) => {
            const { name, target } = item;

            const itemClassName = classNames(null, {
              'active': target === filterContentBlocksTarget
            });

            return (
              <li
                key={'filterItem-' + i}
                onClick={(e) => {
                  this.toggleFilter(e);
                  return this.props.filterContentBlocks(target);
                }}
                className={itemClassName}>
                <span>{name}</span>
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
    const filterClassName = classNames('filter', {
      'active': isFilterOpened
    });

    return (
      <div className={filterClassName}>
        <div className={classNames('filter__text')} onClick={::this.toggleFilter}>
          <span>Filter</span>
          <Icon icon={isFilterOpened ? 'expand-less' : 'expand-more'} size='24' />
        </div>
        <div className={classNames('filter__items')}>
          { this.renderFilterItems() }
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
    filterContentBlocks: (target) => {
      dispatch(filterContentBlocks(target));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter);
