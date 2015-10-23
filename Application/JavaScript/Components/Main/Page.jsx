import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { startNewPage, loadPreviousPage } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';

class Page extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  selectPage (e) {
    const { onStartNewPage, onLoadPreviousPage, data } = this.props;
    const { isNewPage } = data;

    return isNewPage ? onStartNewPage() : onLoadPreviousPage();
  }

  render () {
    const { data, dispatch } = this.props;
    const { isNewPage } = data;
    const name = isNewPage ? getString('pages.newpage') : getString('pages.loadpage');

    return (
      <div
        className='ab-page-new'
        onClick={::this.selectPage}>
        {name}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    localization: state.localizationData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onStartNewPage: () => {
      dispatch(startNewPage());
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
