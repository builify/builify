import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { openSidetab } from '../../Actions';
import { getString } from '../../Common/Localization';
import classNames from 'classnames';
import Icon from './Icon';

class ItemThatOpensSideTab extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render () {
    const { item, onOpenSideTab } = this.props;
    const { target, title, icon } = item;
    const doesItemHaveIcon = icon === null ? false : true;
    const className = classNames('ab-item', doesItemHaveIcon ? 'icon' : 'link');

    return (
      <div
        className={className}
        data-targetid={target}
        onClick={(e) => {
          e.preventDefault();
          return onOpenSideTab(target);
        }}>
        <span>{getString(title)}</span>
        <Icon icon='arrow-forward' />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onOpenSideTab: (target) => {
      dispatch(openSidetab(target));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemThatOpensSideTab);
