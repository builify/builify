import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPageTitle } from '../../Actions/ActionCreators';
import Input from './Input';

class PageTools extends Component {
  inputChange (e) {
    const { onPageTitleChange } = this.props;
    const titleValue = this.refs.pagetitle.getValue();

    return onPageTitleChange(titleValue);
  }

  render () {
    const { page } = this.props;
    const { pageTitle } = page;

    return (
      <div className='ab-itemwrap'>
        <Input
          ref='pagetitle'
          label='Page Title'
          floating={true}
          onChange={::this.inputChange}
          value={pageTitle} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onPageTitleChange: (title) => {
      dispatch(setPageTitle(title));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTools);
