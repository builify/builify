import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startNewPage, loadPreviousPage } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';

class Page extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  selectPage (e) {
    const { isNewPage } = this.props.data;
    return isNewPage ? startNewPage() : loadPreviousPage();
  }

  render () {
    const { data, dispatch } = this.props;
    const { isNewPage } = data;
    const name = isNewPage ? getString('pages.newpage') : getString('pages.loadpage');

    return (
      <div
        className='ab-page-new'
        {...bindActionCreators({
          onClick: ::this.selectPage
        }, dispatch)}>
        <span>{name}</span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    localization: state.localizationData
  }
}

export default connect(
  mapStateToProps
)(Page);
