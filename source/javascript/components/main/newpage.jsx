import React  from 'react';
import classNames from '../../common/classnames';
import localization from '../../common/localization';
import { connect } from 'react-redux';
import { startNewPage, openPreviousPagesSelectionModal } from '../../actions';

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
    } else {
      return openPreviousPagesSelectionModal();
    }
  };

  return (
    <div className={classNames('newpage')} onClick={selectPage}>
      <span>{ label }</span>
    </div>
  );
}

Page.propTypes = {
  newPage: React.PropTypes.bool,
  startNewPage: React.PropTypes.func.isRequired,
  openPreviousPagesSelectionModal: React.PropTypes.func.isRequired
};

Page.defaultProps = {
  newPage: false
};

function mapDispatchToProps (dispatch) {
  return {
    startNewPage: function () {
      dispatch(startNewPage());
    },

    openPreviousPagesSelectionModal: function () {
      dispatch(openPreviousPagesSelectionModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(Page);
