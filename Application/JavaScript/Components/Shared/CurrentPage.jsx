import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import { removeContentBlock, sortContentBlocks } from '../../Actions/ActionCreators';
import _ from 'lodash';
import cx from 'classnames';
import Sortable from './Sortable.jsx';
import SvgIcon from './SvgIcon.jsx';

class CurrentPageItem extends Component {
  static propTypes = {
    onRemoveClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  render () {
    const { data, onRemoveClick } = this.props;
    const { id, type, blockName, elementReference, hasBeenRendered } = data;
    const removeIconStyle = {
      fill: '#ce4031'
    };
    const itemClassName = cx('ab-currentPage__item');

    return (
      <li
        data-blockid={id}
        className={itemClassName}>
        <div
          className='handle'
          title='Remove Element'>
          <SvgIcon
            size={18}
            icon='reorder' />
        </div>
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

    _.map(main, (mainItem) => {
      items.push(mainItem);
    });

    return (
      <Sortable
        sortable={sortableOptions}
        component='ul'
        childElement='div'
        className='ab-currentPage'>
        {_.map(items, (item) => {
          const { elementReference } = item;
          const keyNr = randomKey() + 'cpi';

          return (
            <CurrentPageItem
              onRemoveClick={(e) => {
                return onRemove(elementReference);
              }}
              data={item}
              key={keyNr} />
          )
        })}
      </Sortable>
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
