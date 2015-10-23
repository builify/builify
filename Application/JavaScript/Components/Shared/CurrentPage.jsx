import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeContentBlock, sortContentBlocks } from '../../Actions/ActionCreators';
import cx from 'classnames';
import Sortable from './Sortable.jsx';
import SvgIcon from './SvgIcon.jsx';

class CurrentPageItem extends Component {
  static propTypes = {
    onRemoveClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      isPressed: false
    }
  }

  render () {
    const { data, onRemoveClick } = this.props;
    const { id, type, blockName, elementReference, hasBeenRendered } = data;
    const removeIconStyle = {
      fill: '#ce4031'
    };
    const itemClassName = cx('ab-currentPage__item');

    if (type === 'navigation' || type === 'footer') {
      return null;
    }

    return (
      <li
        data-blockid={id}
        className={itemClassName}>
        <div
          className='handle'
          title='Remove Element'>
          <SvgIcon
            size={18}
            icon='apps' />
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

    if (Object.keys(navigation).length !== 0) {
      items.push(navigation);
    }

    if (Object.keys(footer).length !== 0) {
      items.push(footer);
    }

    main.map((mainItem, i) => {
      items.push(mainItem);
    });

    return (
      <Sortable
        sortable={sortableOptions}
        component='ul'
        childElement='div'
        className='ab-currentPage'>
        {items.map((item, i) => {
          const { elementReference } = item;

          return (
            <CurrentPageItem
              onRemoveClick={(e) => {
                return onRemove(elementReference);
              }}
              data={item}
              key={i} />
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
