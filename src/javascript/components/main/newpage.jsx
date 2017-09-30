import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from '../../common/classnames';
import localization from '../../common/localization';
import * as Actions from '../../actions';

function Page ({
  newPage,
  startNewPage,
  openPreviousPagesSelectionModal
}) {
  const queryString = newPage ?
    'start new page' :
    'load or import page';
  const label = localization(queryString);
  const selectPage = () => {
    if (newPage) {
      return startNewPage();
    }

    return openPreviousPagesSelectionModal();
  };

  return (
    <div className={classNames('newpage')} onClick={selectPage}>
      <span>{ label }</span>
    </div>
  );
}

Page.propTypes = {
  newPage: PropTypes.bool,
  startNewPage: PropTypes.func.isRequired,
  openPreviousPagesSelectionModal: PropTypes.func.isRequired
};

Page.defaultProps = {
  newPage: false
};

function mapDispatchToProps (dispatch) {
  return {
    startNewPage: () => {
      dispatch(Actions.startNewPage());
    },

    openPreviousPagesSelectionModal: () => {
      dispatch(Actions.openPreviousPagesSelectionModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(Page);
