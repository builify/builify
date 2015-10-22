import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeContentBlock } from '../../Actions/ActionCreators';
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
      fill: 'red'
    };

    return (
      <li
        className='ab-currentPage__item'>
        <SvgIcon
          className='mover'
          size={18}
          icon='apps' />
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
    const { page, onRemove } = this.props;
    const { navigation, main, footer } = page;
    let items = [];

    if (Object.keys(navigation).length !== 0) {
      items.push(navigation);
    }

    main.map((mainItem, i) => {
      items.push(mainItem);
    });

    footer.map((footerItem, i) => {
      items.push(footerItem);
    });

    return (
      <ul className='ab-currentPage'>
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
      </ul>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPage);
