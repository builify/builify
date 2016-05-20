import React  from 'react';
import classNames from '../../common/classnames';
import localization from '../../common/localization';
import { connect } from 'react-redux';
import { startNewPage, loadPreviousPage, openPreviousPagesSelectionModal } from '../../actions';

class Page extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    isNewPage: React.PropTypes.bool.isRequired,
    startNewPage: React.PropTypes.func.isRequired,
    openPreviousPagesSelectionModal: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  selectPage () {
    const { isNewPage, builder } = this.props;
    const { pages } = builder;

    if (isNewPage) {
      return this.props.startNewPage();
    } else {
      const pagesLength = pages.length;

      if (pagesLength > 1) {
        return this.props.openPreviousPagesSelectionModal();
      } else {
        return this.props.loadPreviousPage();
      }
    }
  }

  render () {
    const { isNewPage, builder } = this.props;
    const { pages } = builder;
    const pagesLength = pages.length;
    const previousPages = pagesLength > 1 ? 'pages.loadpages' : 'pages.loadpage';
    const queryString = isNewPage ? 'pages.newpage' : previousPages;

    return (
      <div className={classNames('newpage')} onClick={::this.selectPage}>
        <span>{localization(queryString)}</span>
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
    startNewPage: () => {
      dispatch(startNewPage());
    },

    openPreviousPagesSelectionModal: () => {
      dispatch(openPreviousPagesSelectionModal());
    },

    loadPreviousPage: () => {
      dispatch(loadPreviousPage());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);
