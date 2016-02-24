import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from './Icon';

class BackButton extends React.Component {
  static propTypes = {
    clickFunction: React.PropTypes.func,
    wrapperClassName: React.PropTypes.string
  };

  static defaultProps = {
    clickFunction: () => {},
    wrapperClassName: 'ab-tab__close'
  };

  render () {
    const { dispatch } = this.props;

    return (
      <div
        className={this.props.wrapperClassName}
        {...bindActionCreators({
          onClick: ::this.props.clickFunction
        }, dispatch)}>
        <Icon
          icon='arrow-back'
          size={30} />
        <span>Go Back</span>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    localization: state.localizationData
  };
}

export default connect(mapStateToProps)(BackButton);
