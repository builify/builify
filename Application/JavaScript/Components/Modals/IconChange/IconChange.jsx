import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import ModalWrapper from '../ModalWrapper';
import ModalTab from '../ModalTab';
import BottomNavigation from '../ModalBottomNavigation';
import TabIcons from './TabIcons';
import { closeModal } from '../../../Actions';

class IconChange extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  selectIcon (data) {
    const { editTarget } = this.props;
    const { iconClass, icon } = data;

    if (iconClass === 'fa') {
      var patt = new RegExp( '\\s' +
			'fa-*'.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) + '\\s', 'g' );

      var cn = ' ' + editTarget.className + ' ';
  		while ( patt.test( cn ) ) {
  			cn = cn.replace( patt, ' ' );
  		}
  		console.log(cn);
    }
  }

  render () {
    const {
      active,
      builderConfiguration,
      onCloseModal
    } = this.props;
    const className = classNames('ab-modal');

    return (
      <ModalWrapper
        onClose={onCloseModal}
        active={active}
        ref='modalWrapper'
        className={className}>
        <ModalTab
          title='Choose Icon'>
          <TabIcons
            onSelect={::this.selectIcon}
            builderConfiguration={builderConfiguration} />
        </ModalTab>
        <BottomNavigation
          onClose={::this.closeDialog}/>
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IconChange);
