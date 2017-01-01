import React  from 'react';
import classNames from '../../common/classnames';
import localization from '../../common/localization';
import { connect } from 'react-redux';
import { startNewPage, loadPreviousPage, openPreviousPagesSelectionModal } from '../../actions';

class Page extends React.Component {
  static propTypes = {
    pages: React.PropTypes.array.isRequired,
    isNewPage: React.PropTypes.bool.isRequired,
    startNewPage: React.PropTypes.func.isRequired,
    openPreviousPagesSelectionModal: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  selectPage () {
    const { isNewPage, pages } = this.props;

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
    const { isNewPage, pages } = this.props;
    const pagesLength = pages.length;
    const previousPages = pagesLength > 1 ? 'load or import page' : 'load previous page';
    const queryString = isNewPage ? 'start new page' : previousPages;
    const label = localization(queryString);

    return (
      <div className={classNames('newpage')} onClick={::this.selectPage}>
        <span>{ label }</span>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { builder } = state;
  const { pages } = builder;

  return {
    pages: pages
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
