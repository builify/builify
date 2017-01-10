import React  from 'react';
import classNames from '../../common/classnames';
import localization from '../../common/localization';
import { connect } from 'react-redux';
import { startNewPage, loadPreviousPage, openPreviousPagesSelectionModal } from '../../actions';

class Page extends React.Component {
  static propTypes = {
    newPage: React.PropTypes.bool,
    startNewPage: React.PropTypes.func.isRequired,
    openPreviousPagesSelectionModal: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    newPage: false
  };

  shouldComponentUpdate () {
    return false;
  }

  selectPage () {
    if (this.props.newPage) {
      return this.props.startNewPage();
    } else {
      return this.props.openPreviousPagesSelectionModal();
    }
  }

  render () {
    const queryString = this.props.newPage ? 'start new page' : 'load or import page';
    const label = localization(queryString);

    return (
      <div className={classNames('newpage')} onClick={::this.selectPage}>
        <span>{ label }</span>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    startNewPage: function () {
      dispatch(startNewPage());
    },

    openPreviousPagesSelectionModal: function () {
      dispatch(openPreviousPagesSelectionModal());
    },

    loadPreviousPage: function () {
      dispatch(loadPreviousPage());
    }
  };
}

export default connect(null, mapDispatchToProps)(Page);
