import React  from 'react';
import { connect } from 'react-redux';
import { startNewPage, loadPreviousPage, openPreviousPagesSelectionModal } from '../../actions';
import { getString } from '../../Common/Localization';

class Page extends React.Component {
  static propTypes = {
    isNewPage: React.PropTypes.bool.isRequired
  };

  shouldComponentUpdate () {
    return false;
  };

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
      <div className='ab-page-new' onClick={::this.selectPage}>
        <span>{getString(queryString)}</span>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    localization: state.localizationData
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
