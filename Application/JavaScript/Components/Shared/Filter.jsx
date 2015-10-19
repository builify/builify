import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterContentBlocks } from '../../Actions/ActionCreators';
import classNames from 'classnames';
import Icon from './Icon.jsx';

class Filter extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isFilterOpened: false,
      activeTargetId: 0,
      target: null
    };
  }

  filterEvent (e) {
    e.preventDefault();

    this.setState({
      isFilterOpened: !this.state.isFilterOpened
    });
  }

  setTarget (i, target) {
    /*this.setState({
      activeTargetId: i,
      target: target
    });*/
  }

  renderFilterItems () {
    const { theme } = this.props;
    let items = [{
      name: 'Show All',
      target: 'all'
    }];

    if (theme.hasOwnProperty('blocks')) {
      const { blocks } = theme;

      blocks.map((block, i) => {
        const { type } = block;
        items.push({
          name: String(type),
          target: type
        });
      });

      if (items.length > 0) {
        return (
          <ul>
            {items.map((item, i) => {
              const { name, target } = item;
              const { filterContentBlocksTarget } = this.props.builder;
              const { onFilterItemSelection } = this.props;
              let isActive = false;

              if (item.hasOwnProperty('active')) {
                if (item.active) {
                  isActive = true;
                }
              }

              const itemClassName = classNames(target == filterContentBlocksTarget ? 'active' : '');

              return (
                <li
                  key={'filterItem-' + i}
                  onClick={(e) => {
                    e.preventDefault();

                    return onFilterItemSelection(target);
                  }}
                  className={itemClassName}>
                  <span>{name}</span>
                </li>
              )
            })}
          </ul>
        )
      }
    }

    return null;
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

function mapStateToProps (state) {
  return {
    theme: state.theme,
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
