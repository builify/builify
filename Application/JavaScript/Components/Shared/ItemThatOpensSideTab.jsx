import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { openSidetab } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import cx from 'classnames';

class ItemThatOpensSideTab extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render () {
    const { item, onOpenSideTab } = this.props;
    const { target, title, icon } = item;
    const doesItemHaveIcon = icon === null ? false : true;
    const className = cx('ab-item', doesItemHaveIcon ? 'icon' : 'link');

    return (
      <div
        className={className}
        data-targetid={target}
        onClick={(e) => {
          e.preventDefault();
          return onOpenSideTab(target);
        }}>
        <span>{getString(title)}</span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onOpenSideTab: (target) => {
      dispatch(openSidetab(target));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemThatOpensSideTab);
