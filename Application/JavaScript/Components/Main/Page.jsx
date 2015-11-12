import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { startNewPage, loadPreviousPage, openPreviousPagesSelectionModal } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';

class Page extends Component {
  static propTypes = {
    isNewPage: PropTypes.bool.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  selectPage (e) {
    const { onStartNewPage, onPreviousPagesSelection, onLoadPreviousPage, isNewPage, builder } = this.props;
    const { pages } = builder;

    if (isNewPage) {
      return onStartNewPage();
    } else {
      const pagesLength = pages.length;

      console.log(pages);

      if (pagesLength > 1) {
        return onPreviousPagesSelection();
      } else {
        return onLoadPreviousPage();
      }
    }
  }

  render () {
    const { isNewPage, dispatch, builder } = this.props;
    const { pages } = builder;
    const pagesLength = pages.length;
    const previousPages = pagesLength > 1 ? 'pages.loadpages' : 'pages.loadpage';
    const queryString = isNewPage ? 'pages.newpage' : previousPages;

    return (
      <div
        className='ab-page-new'
        onClick={::this.selectPage}>
        { getString(queryString) }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    localization: state.localizationData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onStartNewPage: () => {
      dispatch(startNewPage());
    },

    onPreviousPagesSelection: () => {
      dispatch(openPreviousPagesSelectionModal());
    },

    onLoadPreviousPage: () => {
      dispatch(loadPreviousPage());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
