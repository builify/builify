import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class BackButton extends Component {
  static propTypes = {
    clickFunction: PropTypes.func,
    wrapperClassName: PropTypes.string
  }

  static defaultProps = {
    clickFunction: () => {},
    wrapperClassName: 'ab-tab__close'
  }

  render () {
    const { dispatch } = this.props;

    return (
      <div
        className={this.props.wrapperClassName}
        {...bindActionCreators({
          onClick: ::this.props.clickFunction
        }, dispatch)}>
        <span>Go Back</span>
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
)(BackButton);
