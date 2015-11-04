import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import { removeContentBlock, sortContentBlocks } from '../../Actions/ActionCreators';
import _ from 'lodash';
import cx from 'classnames';
import Sortable from './Sortable';
import SvgIcon from './SvgIcon';

class CurrentPageDivider extends Component {
  render () {
    return (
      <div className='ab-currentPage__divider' />
    )
  }
}

class CurrentPageItem extends Component {
  static propTypes = {
    onRemoveClick: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  static defaultProps = {
    onRemoveClick: () => {}
  }

  render () {
    const { data, onRemoveClick } = this.props;
    const { id, type, blockName, elementReference, hasBeenRendered } = data;
    const removeIconStyle = {
      fill: '#ce4031'
    };
    const isNotSortable = type === 'navigation' || type === 'footer' ? true : false;
    const itemClassName = cx('ab-currentPage__item', isNotSortable ? 'notsortable' : '');

    return (
      <li
        data-blockid={id}
        className={itemClassName}>
        {(() => {
          if (!isNotSortable) {
            return (
              <div
                className='handle'
                title='Remove Element'>
                <SvgIcon
                  size={18}
                  icon='reorder' />
              </div>
            )
          }
        })()}
        <div className='ab-currentPage__item-title'>
          {blockName}
        </div>
        <SvgIcon
          onClick={onRemoveClick}
          className='remove'
          style={removeIconStyle}
          size={24}
          icon='clear' />
      </li>
    )
  }
}

class CurrentPage extends Component {
  render () {
    const { page, onRemove, onSortBlocks } = this.props;
    const { navigation, main, footer } = page;
    const sortableOptions = {
      draggable: '.draggable',
      filter: '.ignore',
      handle: '.handle',
      onSort: (evt) => {
        return onSortBlocks(evt);
      }
    }
    let items = [];
    let notSortableItems = [];

    _.map(main, (mainItem) => {
      items.push(mainItem);
    });

    if (_.values(navigation).length !== 0) {
      notSortableItems.unshift(navigation);
    }

    if (_.values(footer).length !== 0) {
      notSortableItems.push(footer);
    }

    return (
      <div>
        {_.map(notSortableItems, item => {
          const key = randomKey('notsortableitem');

          return (
            <CurrentPageItem
              data={item}
              key={key} />
          )
        })}
        {(() => {
          if (notSortableItems.length > 0) {
            return <CurrentPageDivider />
          }
        })()}
        <Sortable
          sortable={sortableOptions}
          component='ul'
          childElement='div'
          className='ab-currentPage'>
          {_.map(items, (item) => {
            const { elementReference } = item;
            const key = randomKey('sortableitem');

            return (
              <CurrentPageItem
                onRemoveClick={(e) => {
                  return onRemove(elementReference);
                }}
                data={item}
                key={key} />
            )
          })}
        </Sortable>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onRemove: (element) => {
      dispatch(removeContentBlock(element));
    },

    onSortBlocks: (element) => {
      dispatch(sortContentBlocks(element));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPage);
